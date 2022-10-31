package com.training.sensors_monitor.dao;

import com.training.sensors_monitor.model.Sensor;

import java.util.List;

public interface SensorDAO {

    void save(Sensor sensor);

    Sensor getById(Long id);

    void update(Sensor sensor);

    List<Sensor> getAllBySearch(String searchField, String parameter);

    List<Sensor> getAll();

    void deleteById(Long id);
}
