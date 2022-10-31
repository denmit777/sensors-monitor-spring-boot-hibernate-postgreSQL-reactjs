package com.training.sensors_monitor.dto;

import com.training.sensors_monitor.model.enums.Type;
import com.training.sensors_monitor.model.enums.Unit;
import lombok.*;
import org.hibernate.validator.constraints.NotBlank;

import javax.validation.constraints.Size;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SensorDto {

    private static final String NAME_FIELD_IS_EMPTY = "Name field shouldn't be empty";
    private static final String MODEL_FIELD_IS_EMPTY = "Model field shouldn't be empty";
    private static final String WRONG_SIZE_OF_NAME = "Name shouldn't be more than 30 symbols";
    private static final String WRONG_SIZE_OF_MODEL = "Model shouldn't be more than 15 symbols";
    private static final String WRONG_SIZE_OF_LOCATION = "Location shouldn't be more than 40 symbols";
    private static final String WRONG_SIZE_OF_DESCRIPTION = "Description shouldn't be more than 200 symbols";

    @NotBlank(message = NAME_FIELD_IS_EMPTY)
    @Size(max = 30, message = WRONG_SIZE_OF_NAME)
    private String name;

    @NotBlank(message = MODEL_FIELD_IS_EMPTY)
    @Size(max = 15, message = WRONG_SIZE_OF_MODEL)
    private String model;

    private Long rangeFrom;

    private Long rangeTo;

    private Type type;

    private Unit unit;

    @Size(max = 40, message = WRONG_SIZE_OF_LOCATION)
    private String location;

    @Size(max = 200, message = WRONG_SIZE_OF_DESCRIPTION)
    private String description;
}
