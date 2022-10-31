import axios from 'axios';

const SENSOR_API_BASE_URL = "http://localhost:8081/sensors"

class SensorService {

    getAllSensors = () => {
        return axios.get(SENSOR_API_BASE_URL);
    }

    getAllSensorsByPages = (pageSize, pageNumber) => {
        return axios.get(SENSOR_API_BASE_URL + '/?pageSize=' + pageSize + '&pageNumber=' + pageNumber);
    }

    getAllSensorsSearchedByName = (parameter, pageSize) => {
        return axios.get(SENSOR_API_BASE_URL + '/?searchField=name&searchParameter=' + parameter + '&pageSize=' + pageSize);
    }

    getAllSensorsSearchedByModel = (parameter, pageSize) => {
        return axios.get(SENSOR_API_BASE_URL + '/?searchField=model&searchParameter=' + parameter + '&pageSize=' + pageSize);
    }

    getAllSensorsSearchedByType = (parameter, pageSize) => {
        return axios.get(SENSOR_API_BASE_URL + '/?searchField=type&searchParameter=' + parameter + '&pageSize=' + pageSize);
    }

    getAllSensorsSearchedByRange = (parameter, pageSize) => {
        return axios.get(SENSOR_API_BASE_URL + '/?searchField=range&searchParameter=' + parameter + '&pageSize=' + pageSize);
    }

    getAllSensorsSearchedByUnit = (parameter, pageSize) => {
        return axios.get(SENSOR_API_BASE_URL + '/?searchField=unit&searchParameter=' + parameter + '&pageSize=' + pageSize);
    }

    getAllSensorsSearchedByLocation = (parameter, pageSize) => {
        return axios.get(SENSOR_API_BASE_URL + '/?searchField=location&searchParameter=' + parameter + '&pageSize=' + pageSize);
    }

    getAllSensorsSearchedByDescription = (parameter, pageSize) => {
        return axios.get(SENSOR_API_BASE_URL + '/?searchField=description&searchParameter=' + parameter + '&pageSize=' + pageSize);
    }

    createSensor(sensor) {
        return axios.post(SENSOR_API_BASE_URL, sensor);
    }

    getSensorById(sensorId) {
        return axios.get(SENSOR_API_BASE_URL + '/' + sensorId);
    }

    updateSensor(sensor, sensorId) {
        return axios.put(SENSOR_API_BASE_URL + '/' + sensorId, sensor);
    }

    deleteSensor(sensorId) {
        return axios.delete(SENSOR_API_BASE_URL + '/' + sensorId);
    }

    getTotalAmount() {
        return axios.get(SENSOR_API_BASE_URL + '/total');
    }
}

export default new SensorService()