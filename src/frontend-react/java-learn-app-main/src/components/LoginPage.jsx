import React from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import AuthenticationService from '../services/AuthenticationService';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loginValue: '',
      passwordValue: '',
      isForbiddenLogin: false,
      isForbiddenPassword: false,
      validErrors: [],
      accessDeniedLoginErrors: '',
      accessDeniedPasswordErrors: ''
    };

    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
  }

  handleLoginChange = (event) => {
    this.setState({ loginValue: event.target.value });
  };

  handlePasswordChange = (event) => {
    this.setState({ passwordValue: event.target.value });
  };

  register() {
    this.props.history.push(`/register`)
  }

  login() {
    AuthenticationService
      .executeJwtAuthenticationService(this.state.loginValue, this.state.passwordValue)
      .then((response) => {
        AuthenticationService.registerSuccessfulLoginForJwt(this.state.loginValue, response.data.token);

        sessionStorage.setItem("userName", response.data.userName);
        sessionStorage.setItem("userRole", response.data.role);

        this.props.history.push(`/sensors`);
      }).catch(err => {
        if (err.response.status === 401) {
            this.setState({ validErrors: err.response.data });
            this.setState({ accessDeniedLoginErrors: '' });
            this.setState({ accessDeniedPasswordErrors: '' });
        }

        if (err.response.status === 403) {
            this.setState({ isForbiddenLogin: true });
            this.setState({ accessDeniedLoginErrors: err.response.data });
            this.setState({ accessDeniedPasswordErrors: '' });
            this.setState({ validErrors: [] });
        }

        if (err.response.status === 400) {
            this.setState({ isForbiddenPassword: true });
            this.setState({ accessDeniedPasswordErrors: err.response.data.info });
            this.setState({ accessDeniedLoginErrors: '' });
            this.setState({ validErrors: [] });
        }
      })
  }

  render() {
    const { isForbiddenLogin, accessDeniedLoginErrors, isForbiddenPassword, accessDeniedPasswordErrors,
            validErrors } = this.state;

    const { handleLoginChange, handlePasswordChange, login, register } = this;

    return (
      <div className="container">
        <div className="container__title-wrapper">
          <Typography component="h2" variant="h3">
             Login Form
          </Typography>
        </div>
        <Typography component="h6" variant="h6">
            enter login and password for access
        </Typography>
        {isForbiddenLogin &&
            <Typography className="has-error" component="h6" variant="h5">
                {accessDeniedLoginErrors}
            </Typography>
        }
        {isForbiddenPassword &&
            <Typography className="has-error" component="h6" variant="h5">
                {accessDeniedPasswordErrors}
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
                                onClick={login}
                            >
                                Login
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
                                onClick={register}
                            >
                                Register
                            </Button>
                        </div>
                    </td>
                </tr>
            </table>
          </form>
        </div>
        {
          validErrors.length > 0 &&
            <div className="has-error">
              <ol>
                {validErrors.map((key) => {
                  return <li>{key} </li>
                })}
              </ol>
            </div>
        }
      </div>
    );
  }
};

export default LoginPage;
