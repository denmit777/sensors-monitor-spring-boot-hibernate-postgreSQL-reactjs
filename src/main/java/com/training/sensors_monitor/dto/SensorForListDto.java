package com.training.sensors_monitor.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SensorForListDto {

    private Long id;

    private String name;

    private String model;

    private String type;

    private String range;

    private String unit;

    private String location;

    private String description;
}
