import React from "react";
import PropTypes from "prop-types";
import icons from 'glyphicons'

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@material-ui/core";

import { SENSOR_TABLE_COLUMNS } from "../constants/tablesColumns";

class SensorTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      rowsPerPage: 10,
    };
  }

  render() {

    const { sensors, editCallback, deleteCallback, handleMouseEnterCallback,
            handleMouseLeaveCallback, total, selected } = this.props;
    const { page, rowsPerPage, showText } = this.state;

    return (
       <Paper>
         <TableContainer>
           {showText &&
             <div align = 'center'>
                <Typography
                    component="h5"
                    variant="h5"
                    style={{color: 'blue'}}
                >
                    {this.state.description}
                </Typography>
             </div>
           }
           <Table style={{borderTop: '2px solid black'}}>
             <TableHead style={{borderTop: '2px solid black', borderBottom: '2px solid black'}} align="center">
              <TableRow>
                <TableCell style={{visibility: 'none'}}></TableCell>
                {SENSOR_TABLE_COLUMNS.map((column) => (
                  <TableCell style={{borderRight: '2px solid black', borderLeft: '2px solid black'}}
                    align={column.align}
                    key={column.id}>
                    <b>{column.label}</b>
                  </TableCell>
                ))}
                <TableCell style={{visibility: 'none'}}></TableCell>
              </TableRow>
             </TableHead>
             <TableBody>
              {sensors
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow style={{borderTop: '2px solid black', borderBottom: '2px solid black'}}
                        hover role="checkbox"
                        align="center"
                        key={index}>
                        <TableCell>
                            <button
                                onClick={() => editCallback(row.id)}
                                variant="contained"
                                color="primary"
                            >
                                <span>{icons.pencil}</span>
                            </button>
                        </TableCell>
                        {SENSOR_TABLE_COLUMNS.map((column) => {
                            const value = row[column.id];
                            if (column.id === "name") {
                                return (
                                    <TableCell style={{borderRight: '2px solid black', borderLeft: '2px solid black'}}
                                        key={row.id}>
                                        <a style={{ textDecoration: 'underline' }}
                                            onMouseEnter={(event) => handleMouseEnterCallback(row.id, event)}
                                            onMouseLeave={handleMouseLeaveCallback}
                                        >
                                            {value}
                                        </a>
                                    </TableCell>
                                );
                            } else {
                                return <TableCell style={{borderRight: '2px solid black', borderLeft: '2px solid black'}}
                                            key={column.id}>{value}
                                        </TableCell>;
                            }
                        })}
                        <TableCell>
                             <button key={row.id}
                                 onClick={() => deleteCallback(row.id)}
                                 variant="contained"
                                 color="primary"
                             >
                                 <span>{icons.cross}</span>
                             </button>
                        </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
         </Table><br/>
         {selected !== 0 &&
             <Typography align="right" component="h5" variant="h5">
                 Selected: {selected}
             </Typography>
         }
         <Typography align="right" component="h5" variant="h5">
             Total: {total}
         </Typography>
       </TableContainer>
      </Paper>
    );
  }
}

SensorTable.propTypes = {
  handleMouseEnterCallback: PropTypes.func,
  handleMouseLeaveCallback: PropTypes.func,
  addCallback: PropTypes.func,
  editCallback: PropTypes.func,
  deleteCallback: PropTypes.func,
  sensors: PropTypes.array,
  total: PropTypes.number,
  selected: PropTypes.number
};

export default SensorTable;
