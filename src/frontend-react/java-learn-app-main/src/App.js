import "./App.css";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import MainPage from "./components/MainPage";
import AddOrEditSensor from "./components/AddOrEditSensor";
import AuthenticatedRoute from './components/AuthenticatedRoute';

import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={LoginPage} />
        <Route path="/register" exact component={RegisterPage} />
        <AuthenticatedRoute path="/sensors" exact component={MainPage} />
        <Route path="/add-edit" component={AddOrEditSensor} />
      </Switch>
    </Router>
  );
}

export default App;
