package com.training.sensors_monitor.service;

import com.training.sensors_monitor.dto.UserDto;
import com.training.sensors_monitor.model.User;

import java.util.Map;

public interface UserService {

    User save(UserDto userDto);

    Map<Object, Object> authenticateUser(UserDto userDto);

    User getByLoginAndPassword(String login, String password);
}
