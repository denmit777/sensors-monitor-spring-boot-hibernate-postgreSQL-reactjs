package com.training.sensors_monitor.dao;

import com.training.sensors_monitor.model.User;

import java.util.List;

public interface UserDAO {

    void save(User user);

    User getByLogin(String login);

    List<User> getAll();
}
