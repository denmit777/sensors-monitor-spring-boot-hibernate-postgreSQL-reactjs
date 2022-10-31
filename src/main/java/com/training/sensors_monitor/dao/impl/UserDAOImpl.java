package com.training.sensors_monitor.dao.impl;

import com.training.sensors_monitor.dao.UserDAO;
import com.training.sensors_monitor.exception.UserNotFoundException;
import com.training.sensors_monitor.model.User;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
@AllArgsConstructor
public class UserDAOImpl implements UserDAO {

    private static final String QUERY_SELECT_FROM_USER = "from User";
    private static final String USER_NOT_FOUND = "User with login %s not found";

    @PersistenceContext
    private final EntityManager entityManager;

    @Override
    public void save(User user) {
        entityManager.persist(user);
    }

    @Override
    public User getByLogin(String login) {
        return getAll().stream()
                .filter(user -> login.equals(user.getLogin()))
                .findAny()
                .orElseThrow(() -> new UserNotFoundException(String.format(USER_NOT_FOUND, login)));
    }

    @Override
    public List<User> getAll() {
        return entityManager.createQuery(QUERY_SELECT_FROM_USER).getResultList();
    }
}
