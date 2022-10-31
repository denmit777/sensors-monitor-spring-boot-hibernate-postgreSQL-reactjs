package com.training.sensors_monitor.service;

import com.training.sensors_monitor.dto.SensorDto;
import com.training.sensors_monitor.dto.SensorForListDto;
import com.training.sensors_monitor.model.Sensor;

import java.util.List;

public interface SensorService {

    Sensor save(SensorDto sensorDto, String login);

    List<SensorForListDto> getAll(String searchField, String searchParameter, int pageSize, int pageNumber);

    SensorDto getById(Long id);

    Sensor update(Long id, SensorDto sensorDto, String login);

    void deleteById(Long id);

    int getTotalAmount();
}
