package com.training.sensors_monitor.converter.impl;

import com.training.sensors_monitor.converter.SensorConverter;
import com.training.sensors_monitor.dto.SensorDto;
import com.training.sensors_monitor.dto.SensorForListDto;
import com.training.sensors_monitor.model.Sensor;
import com.training.sensors_monitor.model.enums.Type;
import com.training.sensors_monitor.model.enums.Unit;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@Component
@AllArgsConstructor
public class SensorConverterImpl implements SensorConverter {

    @Override
    public SensorDto convertToSensorDto(Sensor sensor) {
        SensorDto sensorDto = new SensorDto();

        sensorDto.setName(sensor.getName());
        sensorDto.setModel(sensor.getModel());
        sensorDto.setRangeFrom(sensor.getRangeFrom());
        sensorDto.setRangeTo(sensor.getRangeTo());
        sensorDto.setType(sensor.getType());
        sensorDto.setUnit(sensor.getUnit());
        sensorDto.setLocation(sensor.getLocation());
        sensorDto.setDescription(sensor.getDescription());

        return sensorDto;
    }

    @Override
    public SensorForListDto convertToSensorForListDto(Sensor sensor) {
        SensorForListDto sensorDto = new SensorForListDto();

        sensorDto.setId(sensor.getId());
        sensorDto.setName(sensor.getName());
        sensorDto.setModel(sensor.getModel());
        sensorDto.setType(getType(sensor.getType()));
        sensorDto.setRange(getRange(sensor.getRangeFrom(), sensor.getRangeTo()));
        sensorDto.setUnit(getUnit(sensor.getUnit()));
        sensorDto.setLocation(sensor.getLocation());
        sensorDto.setDescription(sensor.getDescription());

        return sensorDto;
    }

    @Override
    public Sensor fromSensorDto(SensorDto sensorDto) {
        Sensor sensor = new Sensor();

        sensor.setName(sensorDto.getName());
        sensor.setModel(sensorDto.getModel());
        sensor.setRangeFrom(sensorDto.getRangeFrom());
        sensor.setRangeTo(sensorDto.getRangeTo());
        sensor.setType(sensorDto.getType());
        sensor.setUnit(sensorDto.getUnit());
        sensor.setLocation(sensorDto.getLocation());
        sensor.setDescription(sensorDto.getDescription());

        return sensor;
    }

    private String getRange(Long rangeFrom, Long rangeTo) {
        return rangeFrom + "-" + rangeTo;
    }

    private String getType(Type type) {
        return StringUtils.capitalize(String.valueOf(type).toLowerCase());
    }

    private String getUnit(Unit unit) {
        if (unit.equals(Unit.CELSIUS_DEGREE)) {
            return "°C";
        }

        if (unit.equals(Unit.PERCENT)) {
            return "%";
        }

        return String.valueOf(unit).toLowerCase();
    }
}
