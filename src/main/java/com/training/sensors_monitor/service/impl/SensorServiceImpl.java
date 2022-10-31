package com.training.sensors_monitor.service.impl;

import com.training.sensors_monitor.converter.SensorConverter;
import com.training.sensors_monitor.dao.SensorDAO;
import com.training.sensors_monitor.dao.UserDAO;
import com.training.sensors_monitor.dto.SensorDto;
import com.training.sensors_monitor.dto.SensorForListDto;
import com.training.sensors_monitor.model.Sensor;
import com.training.sensors_monitor.model.User;
import com.training.sensors_monitor.service.SensorService;
import com.training.sensors_monitor.service.ValidationService;
import lombok.AllArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class SensorServiceImpl implements SensorService {

    private static final Logger LOGGER = LogManager.getLogger(SensorServiceImpl.class.getName());

    private final SensorDAO sensorDAO;
    private final SensorConverter sensorConverter;
    private final UserDAO userDAO;
    private final ValidationService validationService;

    @Override
    @Transactional
    public Sensor save(SensorDto sensorDto, String login) {
        validationService.actionWithInvalidSensorRangeInput(sensorDto);

        Sensor sensor = sensorConverter.fromSensorDto(sensorDto);

        User user = userDAO.getByLogin(login);

        sensor.setUser(user);

        sensorDAO.save(sensor);

        LOGGER.info("New sensor: {}", sensor);

        return sensor;
    }

    @Override
    @Transactional
    public List<SensorForListDto> getAll(String searchField, String searchParameter, int pageSize, int pageNumber) {
        List<Sensor> sensors = sensorDAO.getAllBySearch(searchField, searchParameter)
                .stream()
                .sorted(Comparator.comparing(Sensor::getName))
                .collect(Collectors.toList());

        List<Sensor> sensorsByPage = getPage(sensors, pageSize, pageNumber);

        LOGGER.info("All sensors : {}", sensors);

        return sensorsByPage.stream()
                .map(sensorConverter::convertToSensorForListDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public SensorDto getById(Long id) {
        Sensor sensor = sensorDAO.getById(id);

        LOGGER.info("Sensor № {} : {}", id, sensor);

        return sensorConverter.convertToSensorDto(sensor);
    }

    @Override
    @Transactional
    public Sensor update(Long id, SensorDto sensorDto, String login) {
        validationService.actionWithInvalidSensorRangeInput(sensorDto);

        Sensor sensor = sensorConverter.fromSensorDto(sensorDto);

        User user = userDAO.getByLogin(login);

        sensor.setId(id);
        sensor.setUser(user);

        sensorDAO.update(sensor);

        LOGGER.info("Updated sensor: {}", sensor);

        return sensor;
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        sensorDAO.deleteById(id);

        LOGGER.info("Sensors after removing sensor with id = {} : {}", id, sensorDAO.getAll());
    }

    @Override
    @Transactional
    public int getTotalAmount() {
        return sensorDAO.getAll().size();
    }

    private List<Sensor> getPage(List<Sensor> sensors, int pageSize, int pageNumber) {
        List<List<Sensor>> pages = new ArrayList<>();

        for (int i = 0; i < sensors.size(); i += pageSize) {
            List<Sensor> page = new ArrayList<>(sensors.subList(i, Math.min(sensors.size(), i + pageSize)));

            pages.add(page);
        }

        if (!sensors.isEmpty() && pageNumber - 1 <= sensors.size() / pageSize) {
            return pages.get(pageNumber - 1);
        } else {
            return Collections.emptyList();
        }
    }
}
