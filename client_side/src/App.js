import React, { Component } from "react";
import "./App.css";
import StudentSignUp from "./components/signup/StudentSignUp";
import Login from "./components/login/Login";
import { Switch, Route, Redirect } from "react-router-dom";
import "antd/dist/antd.css";
import CompanyDashboard from "./components/home/CompanyDashboard";
import Dashboard from "./components/home/Dashboard";
import StudentDashboard from "./components/home/StudentDashboard";
class App extends Component {
  render() {
    return (
      <div>
        {" "}
        <PrivateRoute
          exact
          path="/student/dashboard"
          component={StudentDashboard}
        />
        <PrivateRoute
          exact
          path="/compnay/dashboard"
          component={CompanyDashboard}
        />
        <Route exact path="/" component={Dashboard} />
        <PrivateRoute exact path="/test" component={StudentDashboard} />
      </div>
    );
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        authenticate() ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

const authenticate = () => {
  if (localStorage.getItem("currentUser") || localStorage.getItem("currentStudent")) {
    return true;
  } else {
    return false;
  }
};

export default App;
