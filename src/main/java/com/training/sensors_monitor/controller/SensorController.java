package com.training.sensors_monitor.controller;

import com.training.sensors_monitor.dto.SensorDto;
import com.training.sensors_monitor.dto.SensorForListDto;
import com.training.sensors_monitor.model.Sensor;
import com.training.sensors_monitor.service.SensorService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;

import static org.springframework.http.HttpStatus.CREATED;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@AllArgsConstructor
@RequestMapping(value = "/sensors")
public class SensorController {

    private final SensorService sensorService;

    @PostMapping
    public ResponseEntity<?> save(@RequestBody @Valid SensorDto sensorDto, Principal principal) {

        Sensor savedSensor = sensorService.save(sensorDto, principal.getName());

        String currentUri = ServletUriComponentsBuilder.fromCurrentRequestUri().toUriString();
        String savedSensorLocation = currentUri + "/" + savedSensor.getId();

        return ResponseEntity.status(CREATED)
                .header(HttpHeaders.LOCATION, savedSensorLocation)
                .body(savedSensor);
    }

    @GetMapping
    public ResponseEntity<?> getAll(@RequestParam(value = "searchField", defaultValue = "default") String searchField,
                                    @RequestParam(value = "searchParameter", defaultValue = "") String parameter,
                                    @RequestParam(value = "pageSize", defaultValue = "4") int pageSize,
                                    @RequestParam(value = "pageNumber", defaultValue = "1") int pageNumber) {

        List<SensorForListDto> sensors = sensorService.getAll(searchField, parameter, pageSize, pageNumber);

        return ResponseEntity.ok(sensors);
    }

    @GetMapping("/total")
    public ResponseEntity<?> getTotalAmount() {
        return ResponseEntity.ok(sensorService.getTotalAmount());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SensorDto> getById(@PathVariable("id") Long id) {
        SensorDto sensorDto = sensorService.getById(id);

        return ResponseEntity.ok(sensorDto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(Principal principal, @PathVariable("id") Long sensorId,
                                    @Valid @RequestBody SensorDto sensorDto) {

        Sensor updatedSensor = sensorService.update(sensorId, sensorDto, principal.getName());

        return ResponseEntity.ok(updatedSensor);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Long sensorId) {
        sensorService.deleteById(sensorId);

        return ResponseEntity.ok().build();
    }
}
