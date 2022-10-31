package com.training.sensors_monitor.service.impl;

import com.training.sensors_monitor.exception.UserIsPresentException;
import com.training.sensors_monitor.exception.UserNotFoundException;
import com.training.sensors_monitor.model.User;
import com.training.sensors_monitor.model.enums.Role;
import com.training.sensors_monitor.security.config.jwt.JwtTokenProvider;
import com.training.sensors_monitor.service.UserService;
import com.training.sensors_monitor.converter.UserConverter;
import com.training.sensors_monitor.dao.UserDAO;
import com.training.sensors_monitor.dto.UserDto;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private static final Logger LOGGER = LogManager.getLogger(UserServiceImpl.class.getName());

    private static final String USER_IS_PRESENT = "User with login %s already present";
    private static final String USER_NOT_FOUND = "User with login %s has another password. " +
            "Go to register or enter valid credentials";

    private final UserDAO userDAO;
    private final UserConverter userConverter;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    @Override
    @Transactional
    public User save(UserDto userDto) {
        if (isUserPresent(userDto)) {
            throw new UserIsPresentException(String.format(USER_IS_PRESENT, userDto.getLogin()));
        }

        User user = userConverter.fromUserDto(userDto);

        user.setRole(Role.ROLE_VIEWER);

        userDAO.save(user);

        LOGGER.info("New user : {}", user);

        return user;
    }

    @Override
    @Transactional
    public Map<Object, Object> authenticateUser(UserDto userDto) {
        User user = getByLoginAndPassword(userDto.getLogin(), userDto.getPassword());

        String token = jwtTokenProvider.createToken(user.getLogin(), user.getRole());

        Map<Object, Object> response = new HashMap<>();

        response.put("userName", user.getLogin());
        response.put("role", user.getRole());
        response.put("token", token);

        return response;
    }

    @Override
    @Transactional
    public User getByLoginAndPassword(String login, String password) {
        User user = userDAO.getByLogin(login);

        if (user != null && passwordEncoder.matches(password, user.getPassword())) {
            return user;
        }

        throw new UserNotFoundException(String.format(USER_NOT_FOUND, login));
    }

    @Transactional
    public boolean isUserPresent(UserDto userDto) {
        String login = userDto.getLogin();

        return userDAO.getAll().stream().anyMatch(user -> login.equals(user.getLogin()));
    }
}
