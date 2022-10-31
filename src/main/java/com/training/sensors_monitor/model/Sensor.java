package com.training.sensors_monitor.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.training.sensors_monitor.model.enums.Type;
import com.training.sensors_monitor.model.enums.Unit;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "sensor")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Sensor implements Serializable {

    private static final long serialVersionUID = 3906771677381811334L;

    @Id
    @SequenceGenerator(name = "sensorsIdSeq", sequenceName = "sensor_id_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sensorsIdSeq")
    @Column(name = "id", nullable = false, updatable = false)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "model", nullable = false)
    private String model;

    @Column(name = "range_from", nullable = false)
    private Long rangeFrom;

    @Column(name = "range_to", nullable = false)
    private Long rangeTo;

    @Column(name = "type")
    @Enumerated(EnumType.STRING)
    private Type type;

    @Column(name = "unit")
    @Enumerated(EnumType.STRING)
    private Unit unit;

    @Column(name = "location")
    private String location;

    @Column(name = "description")
    private String description;

    @ManyToOne(fetch = FetchType.EAGER,
            cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Sensor sensor = (Sensor) o;
        return Objects.equals(id, sensor.id) && Objects.equals(name, sensor.name) && Objects.equals(model, sensor.model) && Objects.equals(rangeFrom, sensor.rangeFrom) && Objects.equals(rangeTo, sensor.rangeTo) && type == sensor.type && unit == sensor.unit && Objects.equals(location, sensor.location) && Objects.equals(description, sensor.description) && Objects.equals(user, sensor.user);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, model, rangeFrom, rangeTo, type, unit, location, description, user);
    }
}
