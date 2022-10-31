package com.training.sensors_monitor.security.service;

import com.training.sensors_monitor.exception.UserNotFoundException;
import com.training.sensors_monitor.model.User;
import com.training.sensors_monitor.dao.UserDAO;
import com.training.sensors_monitor.security.model.CustomUserDetails;
import lombok.AllArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private static final Logger LOGGER = LogManager.getLogger(UserDetailsServiceImpl.class.getName());

    private static final String USER_NOT_FOUND = "User with login %s not found";

    private final UserDAO userDAO;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String login) {
        User user = userDAO.getByLogin(login);

        LOGGER.info("User : {}", user);

        if (user != null) {
            return new CustomUserDetails(user);
        }

        throw new UserNotFoundException(String.format(USER_NOT_FOUND, login));
    }
}

