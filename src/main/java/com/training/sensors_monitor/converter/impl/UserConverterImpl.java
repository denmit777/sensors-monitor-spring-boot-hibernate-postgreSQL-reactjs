package com.training.sensors_monitor.converter.impl;

import com.training.sensors_monitor.converter.UserConverter;
import com.training.sensors_monitor.model.User;
import com.training.sensors_monitor.dto.UserDto;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class UserConverterImpl implements UserConverter {

    private final PasswordEncoder passwordEncoder;

    @Override
    public User fromUserDto(UserDto userDto) {
        User user = new User();

        user.setLogin(userDto.getLogin());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));

        return user;
    }
}
