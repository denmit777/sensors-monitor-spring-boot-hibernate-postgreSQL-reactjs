package com.training.sensors_monitor.dao.impl;

import com.training.sensors_monitor.dao.SensorDAO;
import com.training.sensors_monitor.exception.SensorNotFoundException;
import com.training.sensors_monitor.model.Sensor;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.*;
import java.util.*;
import java.util.stream.Collectors;

@Repository
@AllArgsConstructor
public class SensorDAOImpl implements SensorDAO {

    private static final Map<String, List<Sensor>> SEARCH_MAP = new HashMap<>();
    private static final Set<Map.Entry<String, List<Sensor>>> SEARCH_SET = SEARCH_MAP.entrySet();

    private static final String SENSOR_NOT_FOUND = "Sensor with id %s not found";

    private static final String QUERY_SELECT_FROM_SENSOR = "from Sensor";
    private static final String QUERY_SELECT_FROM_SENSOR_SEARCHED_BY_NAME = "from Sensor s where lower(s.name) like lower(concat('%',?0,'%'))";
    private static final String QUERY_SELECT_FROM_SENSOR_SEARCHED_BY_MODEL = "from Sensor s where lower(s.model) like lower(concat('%',?0,'%'))";
    private static final String QUERY_SELECT_FROM_SENSOR_SEARCHED_BY_TYPE = "from Sensor s where lower(str(s.type)) like lower(concat('%',?0,'%'))";
    private static final String QUERY_SELECT_FROM_SENSOR_SEARCHED_BY_RANGE = "from Sensor s where lower(str(s.rangeFrom)) like lower(concat('%',?0,'%'))" +
            "or lower(str(s.rangeTo)) like lower(concat('%',?0,'%'))";
    private static final String QUERY_SELECT_FROM_SENSOR_SEARCHED_BY_UNIT = "from Sensor s where lower(str(s.unit)) like lower(concat('%',?0,'%'))";
    private static final String QUERY_SELECT_FROM_SENSOR_SEARCHED_BY_LOCATION = "from Sensor s where lower(s.location) like lower(concat('%',?0,'%'))";
    private static final String QUERY_SELECT_FROM_SENSOR_SEARCHED_BY_DESCRIPTION = "from Sensor s where lower(s.description) like lower(concat('%',?0,'%'))";
    private static final String QUERY_DELETE_FROM_SENSOR_BY_SENSOR_ID = "delete from Sensor s where s.id =:id";

    @PersistenceContext
    private final EntityManager entityManager;

    @Override
    public void save(Sensor sensor) {
        entityManager.persist(sensor);
    }

    @Override
    public Sensor getById(Long id) {

        return getAll().stream()
                .filter(good -> id.equals(good.getId()))
                .findAny()
                .orElseThrow(() -> new SensorNotFoundException(String.format(SENSOR_NOT_FOUND, id)));
    }

    @Override
    public void update(Sensor sensor) {
        entityManager.merge(sensor);
    }

    @Override
    public List<Sensor> getAll() {
        return entityManager.createQuery(QUERY_SELECT_FROM_SENSOR)
                .getResultList();
    }

    @Override
    public List<Sensor> getAllBySearch(String searchField, String searchParameter) {

        SEARCH_MAP.put("name", createQueryWithSearchedParameter(QUERY_SELECT_FROM_SENSOR_SEARCHED_BY_NAME, searchParameter));
        SEARCH_MAP.put("model", createQueryWithSearchedParameter(QUERY_SELECT_FROM_SENSOR_SEARCHED_BY_MODEL, searchParameter));
        SEARCH_MAP.put("type", createQueryWithSearchedParameter(QUERY_SELECT_FROM_SENSOR_SEARCHED_BY_TYPE, searchParameter));
        SEARCH_MAP.put("range", createQueryWithSearchedParameter(QUERY_SELECT_FROM_SENSOR_SEARCHED_BY_RANGE, searchParameter));
        SEARCH_MAP.put("unit", createQueryWithSearchedParameter(QUERY_SELECT_FROM_SENSOR_SEARCHED_BY_UNIT, searchParameter));
        SEARCH_MAP.put("location", createQueryWithSearchedParameter(QUERY_SELECT_FROM_SENSOR_SEARCHED_BY_LOCATION, searchParameter));
        SEARCH_MAP.put("description", createQueryWithSearchedParameter(QUERY_SELECT_FROM_SENSOR_SEARCHED_BY_DESCRIPTION, searchParameter));
        SEARCH_MAP.put("default", createQueryWithSearchedParameter(QUERY_SELECT_FROM_SENSOR, ""));

        return SEARCH_SET.stream()
                .filter(pair -> pair.getKey().equals(searchField))
                .map(Map.Entry::getValue)
                .flatMap(Collection::stream)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteById(Long id) {
        entityManager.createQuery(QUERY_DELETE_FROM_SENSOR_BY_SENSOR_ID)
                .setParameter("id", id)
                .executeUpdate();
    }

    private List<Sensor> createQueryWithSearchedParameter(String searchQuery, String searchParameter) {
        Query query = entityManager.createQuery(searchQuery);

        if (!(searchQuery.equals(QUERY_SELECT_FROM_SENSOR))) {
            query.setParameter(0, searchParameter);
        }

        return query.getResultList();
    }
}
