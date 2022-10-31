package com.training.sensors_monitor.service.impl;

import com.training.sensors_monitor.dto.SensorDto;
import com.training.sensors_monitor.exception.InvalidSensorRangeException;
import com.training.sensors_monitor.service.ValidationService;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ValidationServiceImpl implements ValidationService {

    private static final String INVALID_RANGE_OF_SENSOR_ERROR = "RangeTo should be more than RangeFrom";

    @Override
    public List<String> generateErrorMessage(BindingResult bindingResult) {
        return Optional.of(bindingResult)
                .filter(BindingResult::hasErrors)
                .map(this::getErrors)
                .orElseGet(ArrayList::new);
    }

    @Override
    public void actionWithInvalidSensorRangeInput(SensorDto sensorDto) {
        if (!isRangeValid(sensorDto)) {
            throw new InvalidSensorRangeException(INVALID_RANGE_OF_SENSOR_ERROR);
        }
    }

    private boolean isRangeValid(SensorDto sensorDto) {
        return sensorDto.getRangeFrom() < sensorDto.getRangeTo();
    }

    private List<String> getErrors(BindingResult bindingResult) {
        List<FieldError> errors = bindingResult.getFieldErrors();

        return errors.stream()
                .map(e -> e.getField() + " : " + e.getDefaultMessage())
                .collect(Collectors.toList());
    }
}
