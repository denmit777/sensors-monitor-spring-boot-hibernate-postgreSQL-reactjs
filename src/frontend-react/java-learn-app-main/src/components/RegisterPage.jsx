import React from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import AuthenticationService from '../services/AuthenticationService';

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loginValue: "",
      passwordValue: "",
      registerValidErrors: [],
      isUserPresent: false,
      userIsPresentErrors: ''
    };

    this.signIn = this.signIn.bind(this);
  }

  handleLoginChange = (event) => {
    this.setState({ loginValue: event.target.value });
  };

  handlePasswordChange = (event) => {
    this.setState({ passwordValue: event.target.value });
  };

  signIn() {
      AuthenticationService
        .createUser(this.state.loginValue, this.state.passwordValue)
        .then((response) => {
          this.props.history.push('/')
        })
        .catch(err => {
          if (err.response.status === 401) {
            this.setState({ registerValidErrors: err.response.data });
            this.setState({ userIsPresentErrors: '' });
          }

          if (err.response.status === 400) {
            this.setState({ isUserPresent: true })
            this.setState({ userIsPresentErrors: err.response.data.info });
            this.setState({ registerValidErrors: [] });
          }
        })
  }

  render() {

    const { isUserPresent, userIsPresentErrors, registerValidErrors } = this.state;

    const { handleLoginChange, handlePasswordChange, signIn } = this;

    return (
          <div className="container">
            <div className="container__title-wrapper">
              <Typography component="h2" variant="h3">
                 Register Form
              </Typography>
            </div>
            <Typography component="h6" variant="h6">
               enter login and password for register
            </Typography>
            {isUserPresent &&
                <Typography className="has-error" component="h6" variant="h5">
                    {userIsPresentErrors}
                </Typography>
            }
            <div className="container__from-wrapper">
              <form>
                <table>
                    <tr className="table">
                        <td>
                            <Typography component="h6" variant="h5">
                                Login
                            </Typography>
                        </td>
                        <td>
                            <TextField
                                onChange={handleLoginChange}
                                variant="outlined"
                                placeholder="Your Login"
                            />
                        </td>
                    </tr>
                    <tr className="table">
                        <td>
                            <Typography component="h6" variant="h5">
                                Password
                            </Typography>
                        </td>
                        <td>
                            <TextField
                                onChange={handlePasswordChange}
                                variant="outlined"
                                type="password"
                                placeholder="Your Password"
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
                                    onClick={signIn}
                                >
                                    Sign In
                                </Button>
                            </div>
                        </td>
                    </tr>
                </table>
              </form>
            </div>
            {
              registerValidErrors.length > 0 &&
                <div className="has-error">
                  <ol>
                    {registerValidErrors.map((key) => {
                      return <li>{key} </li>
                    })}
                  </ol>
                </div>
            }
          </div>
        );
      }
    };

export default RegisterPage;