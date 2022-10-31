package com.training.sensors_monitor.service;

import com.training.sensors_monitor.dto.SensorDto;
import org.springframework.validation.BindingResult;

import java.util.List;

public interface ValidationService {

    List<String> generateErrorMessage(BindingResult bindingResult);

    void actionWithInvalidSensorRangeInput(SensorDto sensorDto);
}
