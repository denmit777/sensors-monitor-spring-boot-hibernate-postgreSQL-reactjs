1.Name of project: sensors-monitor-spring-boot-hibernate-postgresql-reactjs

2.Launch of project: 
backend part: sensors-monitor-spring-boot-hibernate-postgreSQL-reactjs\src\main\java\com.training.sensors_monitor\SensorsMonitorApplication.class
node modules: sensors-monitor-spring-boot-hibernate-postgreSQL-reactjs\src\frontend-react\java-learn-app-main>npm install
frontend part: sensors-monitor-spring-boot-hibernate-postgreSQL-reactjs\src\frontend-react\java-learn-app-main>npm start

3.Ports of the project:
backend: http://localhost:8081
frontend: http://localhost:3000

4.Start page: http://localhost:3000

5.Logins/passwords/role of users:

Denis/1234/ROLE_ADMINISTRATOR,
Peter/4321/ROLE_VIEWER,
Asya/5678/ROLE_ADMINISTRATOR,
Jimmy/P@ssword1/ROLE_VIEWER

6.Database scripts: resources/data.sql

7.Application properties: resources/application.properties

8.Rest controllers:

UserController:
registerUser(POST): http://localhost:8081 + body;
authenticationUser(POST): http://localhost:8081/auth + body

SensorController:
save(POST): http://localhost:8081/sensors + body;
getAll(GET): http://localhost:8081/sensors + parameters
getTotalAmount(GET): http://localhost:8081/sensors/total
getById(GET): http://localhost:8081/sensors/{id};
update(PUT): http://localhost:8081/sensors/{id} + body
delete(DELETE): http://localhost:8081/sensors/{id};
