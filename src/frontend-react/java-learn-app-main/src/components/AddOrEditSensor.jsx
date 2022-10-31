import React from "react";
import {
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";

import { TYPES_OPTIONS, UNITS_OPTIONS } from "../constants/inputsValues";
import SensorService from '../services/SensorService';

class AddOrEditSensor extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      name: 'Sensor',
      model: 'model',
      rangeFrom: 12,
      rangeTo: 45,
      type: 'PRESSURE',
      unit: 'BAR',
      location: '',
      description: 'This is a sensor',
      invalidSensorError: [],
      isInvalidSensor: false,
      invalidRangeOfSensorError: '',
      isInvalidRangeOfSensor: false
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleModelChange = this.handleModelChange.bind(this);
    this.handleRangeFromChange = this.handleRangeFromChange.bind(this);
    this.handleRangeToChange = this.handleRangeToChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleUnitChange = this.handleUnitChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleSaveSensor = this.handleSaveSensor.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {

    const sensorId = sessionStorage.getItem("sensorId");

    if(sensorId !== -1) {

      SensorService.getSensorById(sensorId).then((res) => {
        let sensor = res.data;

        this.setState({
          name: sensor.name,
          model: sensor.model,
          rangeFrom: sensor.rangeFrom,
          rangeTo: sensor.rangeTo,
          type: sensor.type,
          unit: sensor.unit,
          location: sensor.location,
          description: sensor.description
        });
      });
    }
  }

  handleNameChange = (event) => {
    this.setState({
      name: event.target.value,
    });
  };

  handleModelChange = (event) => {
    this.setState({
      model: event.target.value,
    });
  };

  handleRangeFromChange = (event) => {
    this.setState({
      rangeFrom: event.target.value,
    });
  };

  handleRangeToChange = (event) => {
    this.setState({
      rangeTo: event.target.value,
    });
  };

  handleTypeChange = (event) => {
    this.setState({
      type: event.target.value,
    });
  };

  handleUnitChange = (event) => {
    this.setState({
       unit: event.target.value,
     });
  };

  handleLocationChange = (event) => {
    this.setState({
      location: event.target.value,
    });
  };

  handleDescriptionChange = (event) => {
    this.setState({
      description: event.target.value,
    });
   };

  handleSaveSensor = () => {
    const sensor = {
       name: this.state.name,
       model: this.state.model,
       rangeFrom: this.state.rangeFrom,
       rangeTo: this.state.rangeTo,
       type: this.state.type,
       unit: this.state.unit,
       location: this.state.location,
       description: this.state.description
    };

    const sensorId = sessionStorage.getItem("sensorId");

    if(sensorId === -1) {
        SensorService.createSensor(sensor).then(res => {
            this.props.history.push(`/sensors`);
        }).catch(err => {
            if (err.response.status === 400) {
                this.setState({ isInvalidSensor: true });
                this.setState({ invalidSensorError: err.response.data });
                this.setState({ invalidRangeOfSensorError: '' });
            }
            if (err.response.status === 403) {
                this.setState({ isInvalidRangeOfSensor: true });
                this.setState({ invalidRangeOfSensorError: err.response.data.info });
                this.setState({ invalidSensorError: [] });
            }
        })
    } else {
        SensorService.updateSensor(sensor, sensorId).then(res => {
            this.props.history.push(`/sensors`);
        }).catch(err => {
            if (err.response.status === 400) {
                this.setState({ isInvalidSensor: true });
                this.setState({ invalidSensorError: err.response.data });
                this.setState({ invalidRangeOfSensorError: '' });
            }
            if (err.response.status === 403) {
                this.setState({ isInvalidRangeOfSensor: true });
                this.setState({ invalidRangeOfSensorError: err.response.data.info });
                this.setState({ invalidSensorError: [] });
            }
        })
    }
  }

  handleCancel() {
      this.props.history.push(`/sensors`);
  }

  render() {
    const {
      name,
      model,
      rangeFrom,
      rangeTo,
      type,
      unit,
      location,
      description,
      invalidSensorError,
      isInvalidSensor,
      invalidRangeOfSensorError,
      isInvalidRangeOfSensor
    } = this.state;

    const { handleNameChange, handleModelChange, handleRangeFromChange, handleRangeToChange, handleTypeChange,
            handleUnitChange, handleLocationChange, handleDescriptionChange, handleSaveSensor, handleCancel } = this;

    return (
      <div className="create-container">
        <div>
          <Typography display="block" variant="h3">
            Add/edit
          </Typography>
        </div><br/>
        {isInvalidSensor &&
            <Typography className="has-error" component="h6" variant="h5">
                {invalidSensorError.map((error, index) => (
                    <div>
                        {index + 1}
                      . {error.name}
                        {error.model}
                        {error.location}
                        {error.description}
                    </div>
                ))}
            </Typography>
        }
        {isInvalidRangeOfSensor &&
            <Typography className="has-error" component="h6" variant="h5">
                {invalidRangeOfSensorError}
            </Typography>
        }
        <div className="container__from-wrapper">
             <form>
                <table>
                  <tr className="table">
                      <td>
                        <Typography component="h6" variant="h5">
                            Name *
                        </Typography>
                      </td>
                      <td>
                        <TextField
                            required
                            onChange={handleNameChange}
                            variant="outlined"
                            placeholder="Name"
                            style = {{width: 300}}
                            value={name}
                        />
                      </td>
                    </tr>
                    <tr className="table">
                      <td>
                        <Typography component="h6" variant="h5">
                            Model *
                        </Typography>
                      </td>
                      <td>
                        <TextField
                            required
                            onChange={handleModelChange}
                            variant="outlined"
                            placeholder="Model"
                            style = {{width: 300}}
                            value={model}
                        />
                      </td>
                    </tr>
                    <tr className="table">
                        <td>
                            <Typography component="h6" variant="h5">
                                Range
                            </Typography>
                        </td>
                        <td>
                            From
                            <TextField
                                onChange={handleRangeFromChange}
                                variant="outlined"
                                type="number"
                                value={rangeFrom}
                                InputProps={{
                                  inputProps: {
                                      max: 100, min: -100
                                  }
                                }}
                                style = {{width: 122}}
                            />
                            To
                            <TextField
                                onChange={handleRangeToChange}
                                variant="outlined"
                                type="number"
                                value={rangeTo}
                                InputProps={{
                                  inputProps: {
                                    max: 100, min: -100
                                  }
                                }}
                                style = {{width: 122}}
                            />
                        </td>
                    </tr>
                    <tr className="table">
                       <td>
                         <Typography component="h6" variant="h5">
                             Type *
                         </Typography>
                       </td>
                       <td>
                         <Select
                            className={"sensor-creation-input_width200"}
                            required
                            value={type}
                            label="Type"
                            onChange={handleTypeChange}
                            inputProps={{
                                name: "type",
                                id: "type-label",
                            }}
                          >
                            {TYPES_OPTIONS.map((item, index) => {
                                return (
                                    <MenuItem value={item.value} key={index}>
                                        {item.label}
                                    </MenuItem>
                                );
                            })}
                         </Select>
                       </td>
                     </tr>
                     <tr className="table">
                          <td>
                            <Typography component="h6" variant="h5">
                                Unit *
                            </Typography>
                          </td>
                          <td>
                            <Select
                               required
                               value={unit}
                               label="Unit"
                               onChange={handleUnitChange}
                               inputProps={{
                                   name: "unit",
                                   id: "unit-label",
                               }}
                             >
                               {UNITS_OPTIONS.map((item, index) => {
                                   return (
                                       <MenuItem value={item.value} key={index}>
                                           {item.label}
                                       </MenuItem>
                                   );
                               })}
                            </Select>
                          </td>
                     </tr>
                     <tr className="table">
                        <td>
                          <Typography component="h6" variant="h5">
                              Location
                          </Typography>
                        </td>
                        <td>
                          <TextField
                              onChange={handleLocationChange}
                              variant="outlined"
                              placeholder="Location"
                              style = {{width: 300}}
                              value={location}
                          />
                        </td>
                     </tr>
                     <tr className="table">
                        <td>
                          <Typography component="h6" variant="h5">
                              Description
                          </Typography>
                        </td>
                        <td>
                          <TextField
                              onChange={handleDescriptionChange}
                              variant="outlined"
                              multiline
                              rows={4}
                              placeholder="Here is a some text input"
                              style = {{width: 300}}
                              value={description}
                          />
                        </td>
                   </tr><br/>
                    <tr className="table">
                    <td>
                     <div className="container__button-wrapper">
                        <Button
                             size="large"
                             variant="contained"
                             color="primary"
                            type="reset"
                            onClick={handleSaveSensor}
                         >
                           Save
                        </Button>
                        </div>
                        </td>
                    <td>
                      <div className="container__button-wrapper">
                         <Button
                             size="large"
                             variant="contained"
                             color="secondary"
                             type="reset"
                             onClick={handleCancel}
                          >
                            Cancel
                         </Button>
                         </div>
                         </td>
                     </tr>
                </table>
             </form>
           </div>
      </div>
    );
  }
}

export default AddOrEditSensor;