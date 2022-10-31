import React from "react";
import SensorTable from "./SensorTable";
import { AppBar, Button, Typography, TextField } from "@material-ui/core";
import SensorService from '../services/SensorService';

class MainPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      prop: 42,
      allSensors: [],
      filteredByNameSensors: [],
      filteredByModelSensors: [],
      filteredByTypeSensors: [],
      filteredByRangeSensors: [],
      filteredByUnitSensors: [],
      filteredByLocationSensors: [],
      filteredByDescriptionSensors: [],
      searchValue: '',
      searchError: [],
      noAccessToChangeSensor: "",
      total: 0,
      showText: false,
      description: '',
      pageSize: 4,
      pageNumber: 1
    };

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.addSensor = this.addSensor.bind(this);
    this.editSensor = this.editSensor.bind(this);
    this.removeSensor = this.removeSensor.bind(this);
  }

  componentDidMount() {
    SensorService.getAllSensors().then((res) => {
      this.setState({ allSensors: res.data });
    });

    SensorService.getTotalAmount().then((res) => {
       this.setState({ total: res.data });
    });
  }

  handlePreviousPageNumberChange = () => {
     const pageNumber = sessionStorage.getItem("pageNumber");
     const { pageSize } = this.state;

     if(pageNumber !== 1) {
        SensorService.getAllSensorsByPages(pageSize, pageNumber - 1).then((res) => {
            this.setState({ allSensors: res.data });
            this.setState({ noAccessToChangeSensor: "" });
        });
     }
  };

  handlePageNumberChange = (pageNumber) => {
     const { pageSize } = this.state;

     SensorService.getAllSensorsByPages(pageSize, pageNumber).then((res) => {
        this.setState({ allSensors: res.data });
        this.setState({ noAccessToChangeSensor: "" });
     });

     sessionStorage.setItem("pageNumber", pageNumber);
  };

  handleNextPageNumberChange = () => {
     let pageNumber = sessionStorage.getItem("pageNumber");
     const { total, pageSize } = this.state;

     this.setState({ noAccessToChangeSensor: "" });

     if (pageSize * pageNumber > total) {
         pageNumber ++;

         SensorService.getAllSensorsByPages(pageSize, +pageNumber + 1).then((res) => {
             this.setState({ allSensors: res.data });
         });
      } else {
          SensorService.getAllSensorsByPages(pageSize, +pageNumber + 1).then((res) => {
             this.setState({ allSensors: res.data });
          });
       }
  };

  handleMouseEnter = (sensorId, event) => {
     SensorService.getSensorById(sensorId).then((res) => {
         let sensor = res.data;

         this.setState({
            description: sensor.description,
         });
     });

      this.setState({ showText: true });
  }

  handleMouseLeave = (event) => {
     this.setState({ showText: false });
  }

  handleLogout = () => {
     window.location.href = "/";
  };

  addSensor() {
     const userRole = sessionStorage.getItem("userRole");

     sessionStorage.setItem("sensorId", -1);

     if (userRole !== "ROLE_VIEWER") {
         this.props.history.push('/add-edit');
     } else {
         this.setState({ noAccessToChangeSensor: "You can't have access to add sensor" });
     }
  }

  editSensor(sensorId) {
     const userRole = sessionStorage.getItem("userRole");

     sessionStorage.setItem("sensorId", sensorId);

     if (userRole !== "ROLE_VIEWER") {
        this.props.history.push('/add-edit');
     } else {
        this.setState({ noAccessToChangeSensor: "You can't have access to edit sensor" });
     }
  }

  removeSensor(sensorId) {
     const userRole = sessionStorage.getItem("userRole");
     const sensors = this.state.allSensors;

      if (userRole !== "ROLE_VIEWER") {
        SensorService.deleteSensor(sensorId).then( res => {

            const data = sensors.filter(i => i.id !== sensorId);

            this.setState({allSensors : data});
            this.setState({filteredByNameSensors : data});
            this.setState({filteredByModelSensors : data});
            this.setState({filteredByTypeSensors : data});
            this.setState({filteredByRangeSensors : data});
            this.setState({filteredByUnitSensors : data});
            this.setState({filteredByLocationSensors : data});
            this.setState({filteredByDescriptionSensors : data});

            sensorId--;
         });
     } else {
        this.setState({ noAccessToChangeSensor: "You can't have access to remove sensor" });
     }
  }

   handleSearchValueChange = (event) => {
       this.setState({ searchValue: event.target.value });
   };

   handleSearchSensor = (searchValue) => {
      const { total } = this.state;
      this.setState({ noAccessToChangeSensor: "" });

      if (searchValue === '') {
          SensorService.getAllSensors().then((res) => {
             this.setState({ allSensors: res.data });
          });
      }

      SensorService.getAllSensorsSearchedByName(searchValue, total).then((res) => {
          this.setState({ filteredByNameSensors: res.data });
      })

      SensorService.getAllSensorsSearchedByModel(searchValue, total).then((res) => {
          this.setState({ filteredByModelSensors: res.data });
      })

      SensorService.getAllSensorsSearchedByType(searchValue, total).then((res) => {
          this.setState({ filteredByTypeSensors: res.data });
      })

      SensorService.getAllSensorsSearchedByRange(searchValue, total).then((res) => {
          this.setState({ filteredByRangeSensors: res.data });
      })

      SensorService.getAllSensorsSearchedByUnit(searchValue, total).then((res) => {
          this.setState({ filteredByUnitSensors: res.data });
      })

      SensorService.getAllSensorsSearchedByLocation(searchValue, total).then((res) => {
          this.setState({ filteredByLocationSensors: res.data });
      })

      SensorService.getAllSensorsSearchedByDescription(searchValue, total).then((res) => {
          this.setState({ filteredByDescriptionSensors: res.data });
      })
   }

  render() {
    const { allSensors, filteredByNameSensors, filteredByModelSensors, filteredByTypeSensors, filteredByRangeSensors,
            filteredByUnitSensors, filteredByLocationSensors, filteredByDescriptionSensors, searchValue, showText,
            description, total, pageNumber, noAccessToChangeSensor } = this.state;

    const { handleSearchSensor, addSensor, editSensor, handleSearchValueChange, removeSensor,
            handleMouseEnter, handleMouseLeave, handlePageNumberChange,
            handlePreviousPageNumberChange, handleNextPageNumberChange, handleLogout} = this;

    return (
        <div>
             <div className="buttons-container">
                <Typography component="h2" variant="h3">
                    Sensor table
                </Typography>
                {noAccessToChangeSensor.length > 0 &&
                    <Typography className="has-error" component="h5" variant="h5">
                        {noAccessToChangeSensor}
                    </Typography>
                }
                <Button
                    onClick={handleLogout}
                    variant="contained"
                    color="secondary"
                >
                    Logout
                </Button>
             </div>
             <div className="table-container">
                <div className="container__from-wrapper">
                    <form>
                        <table>
                            <tr className="table">
                                <td>
                                    <TextField
                                        onChange={handleSearchValueChange}
                                        variant="outlined"
                                        placeholder="Enter text to search"
                                    />
                                </td>
                                <td>
                                    <div className="container__button-wrapper">
                                        <Button
                                             onClick={() => handleSearchSensor(searchValue)}
                                             variant="contained"
                                             color="secondary"
                                        >
                                            Search
                                        </Button>
                                    </div>
                                </td>
                                {showText &&
                                    <td>
                                        <Typography
                                             component="h5"
                                             variant="h5"
                                             style={{color: 'blue'}}
                                        >
                                             {description}
                                        </Typography>
                                    </td>
                                }
                            </tr>
                        </table>
                    </form>
                </div><br/>
                <AppBar position="static">
                    <SensorTable
                        handleMouseEnterCallback={handleMouseEnter}
                        handleMouseLeaveCallback={handleMouseLeave}
                        addCallback={addSensor}
                        editCallback={editSensor}
                        deleteCallback={removeSensor}
                        sensors = {
                            filteredByNameSensors.length > 0 ?
                            filteredByNameSensors:
                            filteredByModelSensors.length > 0 ?
                            filteredByModelSensors :
                            filteredByTypeSensors.length > 0?
                            filteredByTypeSensors :
                            filteredByRangeSensors.length > 0?
                            filteredByRangeSensors :
                            filteredByUnitSensors.length > 0?
                            filteredByUnitSensors :
                            filteredByLocationSensors.length > 0 ?
                            filteredByLocationSensors :
                            filteredByDescriptionSensors.length > 0 ?
                            filteredByDescriptionSensors : allSensors
                        }
                        total = {total}
                        selected = {
                            filteredByNameSensors.length > 0 ?
                            filteredByNameSensors.length:
                            filteredByModelSensors.length > 0 ?
                            filteredByModelSensors.length :
                            filteredByTypeSensors.length > 0?
                            filteredByTypeSensors.length :
                            filteredByRangeSensors.length > 0?
                            filteredByRangeSensors.length :
                            filteredByUnitSensors.length > 0?
                            filteredByUnitSensors.length :
                            filteredByLocationSensors.length > 0 ?
                            filteredByLocationSensors.length :
                            filteredByDescriptionSensors.length > 0 ?
                            filteredByDescriptionSensors.length : 0}
                    />
                </AppBar><br/>
                <div>
                    <table>
                        <tr className="table">
                            <td>
                               <Button
                                   size="large"
                                   variant="contained"
                                   color="primary"
                                   type="reset"
                                   onClick={addSensor}
                               >
                                   Add Sensor
                               </Button>
                            </td>
                            <td>
                                <div  className="container__button-wrapper">
                                    <button
                                        size="large"
                                        variant="contained"
                                        color="primary"
                                        type="reset"
                                        onClick={handlePreviousPageNumberChange}
                                    >
                                        Previous
                                    </button>
                                </div>
                            </td>
                            <td>
                                <div className="container__button-wrapper">
                                    <button
                                        size="large"
                                        variant="contained"
                                        color="primary"
                                        type="reset"
                                        onClick={() => handlePageNumberChange(1)}
                                    >
                                        {pageNumber}
                                    </button>
                                </div>
                            </td>
                            <td>
                                <div className="container__button-wrapper">
                                    <button
                                        size="large"
                                        variant="contained"
                                        color="secondary"
                                        type="reset"
                                        onClick={() => handlePageNumberChange(2)}
                                    >
                                        {pageNumber + 1}
                                    </button>
                                </div>
                            </td>
                            <td>
                                <div className="container__button-wrapper">
                                    <button
                                        size="large"
                                        variant="contained"
                                        color="primary"
                                        type="reset"
                                        onClick={() => handlePageNumberChange(3)}
                                    >
                                        {pageNumber + 2}
                                    </button>
                                </div>
                            </td>
                            <td>
                                <div className="container__button-wrapper">
                                    <button
                                        size="large"
                                        variant="contained"
                                        color="primary"
                                        type="reset"
                                        onClick={handleNextPageNumberChange}
                                    >
                                        Next
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
             </div>
        </div>
    );
  }
}

export default MainPage;
