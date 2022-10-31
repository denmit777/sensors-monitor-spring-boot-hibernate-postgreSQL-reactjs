package com.training.sensors_monitor.converter;

import com.training.sensors_monitor.model.User;
import com.training.sensors_monitor.dto.UserDto;

public interface UserConverter {

    User fromUserDto(UserDto userDto);
}
