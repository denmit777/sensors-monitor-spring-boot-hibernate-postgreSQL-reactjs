package com.training.sensors_monitor.dto;

import lombok.*;
import org.hibernate.validator.constraints.NotBlank;

import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserDto {

    private static final String FIELD_IS_EMPTY = "Fields shouldn't be empty";
    private static final String WRONG_SIZE_OF_NAME_OR_PASSWORD = "Login or password shouldn't be less than 4 symbols";
    private static final String INVALID_LOGIN_OR_PASSWORD = "Login or password should contains Latin letters";

    @NotBlank(message = FIELD_IS_EMPTY)
    @Size(min = 4, message = WRONG_SIZE_OF_NAME_OR_PASSWORD)
    @Pattern(regexp = "^[^А-Яа-я]*$", message = INVALID_LOGIN_OR_PASSWORD)
    private String login;

    @NotBlank(message = FIELD_IS_EMPTY)
    @Size(min = 4, message = WRONG_SIZE_OF_NAME_OR_PASSWORD)
    @Pattern(regexp = "^[^А-Яа-я]*$", message = INVALID_LOGIN_OR_PASSWORD)
    private String password;
}
