package com.training.sensors_monitor.converter;

import com.training.sensors_monitor.dto.SensorDto;
import com.training.sensors_monitor.dto.SensorForListDto;
import com.training.sensors_monitor.model.Sensor;

public interface SensorConverter {

    SensorDto convertToSensorDto(Sensor sensor);

    SensorForListDto convertToSensorForListDto(Sensor sensor);

    Sensor fromSensorDto(SensorDto sensorDto);
}
