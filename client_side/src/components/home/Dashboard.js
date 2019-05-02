import React, { Component } from "react";
import { Tabs, message } from "antd";
import Login from "../login/Login";
import CompanyDashboard from "./CompanyDashboard";
import StudentDashboard from "./StudentDashboard";
import StudentSignUp from "../signup/StudentSignUp";
import CompanySignUp from "../signup/CompanySignUp";

const TabPane = Tabs.TabPane;
export default class Dashboard extends Component {
  state = {
    name: "",
    password: "",
    logFormStatus: true,
    actKey: "1"
  };
  handleChange = evt => {
    const text = evt.target.value;
    const name = evt.target.name;
    this.setState({
      [name]: text
    });
  };
  login = () => {
    const { name, password } = this.state;
    fetch("http://localhost:4000/students/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, password })
    })
      .then(res => res.json())
      .then(json => {
       
        if (json != 403) {
          localStorage.setItem("currentStudent", JSON.stringify(json[0]));
          this.props.history.push({
            pathname: "/student/dashboard",
            state: { currentStudent: json[0] }
          });
        } else {
          message.error("Please provide correct username and password",3)
          this.setState({
            name: "",
            password: ""
          });
        }
      })
      .catch(err => {
        message.error("404 error Page not found",3);

      });
  };
  loginCompany = () => {
    const { name, password } = this.state;
    fetch("http://localhost:4000/company/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, password })
    })
      .then(res => {
        return res.json()
      })
      .then(json => {
        if (json.length > 0) {
          localStorage.setItem("currentUser", JSON.stringify(json[0]));
          this.props.history.push({
            pathname: "/compnay/dashboard",
            state: { currentUser: json[0] }
          });
        } else {
          message.error("Please provide correct username and password",3)
          this.setState({
            name: "",
            password: ""
          });
        }
      })
      .catch(err => {
        message.error("404 error Page not found",3);
        console.log("err:", err);
      });
  };
  handleClick = () => {
    this.props.role === "student" ? this.login() : this.loginCompany();
  };
  handleFormStatus = evt => {
    evt && evt.preventDefault();
    this.setState(pre => ({
      logFormStatus: !pre.logFormStatus
    }));
  };
  handleComFormStatus = evt => {
    evt && evt.preventDefault();
    this.setState(pre => ({
      logFormStatus: !pre.logFormStatus,
      actKey: "2"
    }));
  };
  render() {
    const {
      name,
      password,
      currentUser,
      currentStudent,
      logFormStatus,
      actKey
    } = this.state;

    return (
      <Tabs defaultActiveKey={actKey}>
        <TabPane tab="Login As Student" key="1">
          {logFormStatus ? (
            <Login
              role="student"
              name={name}
              password={password}
              handleClick={this.handleChange}
              handleChange={evt => this.handleChange(evt)}
              login={this.login}
              handleFormStatus={this.handleFormStatus}
            />
          ) : (
            <StudentSignUp handleFormStatus={this.handleFormStatus} />
          )}
        </TabPane>
        <TabPane tab="Login As Company" key="2">
          {logFormStatus ? (
            <Login
              role="company"
              name={name}
              password={password}
              handleClick={this.handleChange}
              handleChange={evt => this.handleChange(evt)}
              handleComFormStatus={this.handleComFormStatus}
              login={this.loginCompany}
            />
          ) : (
            <CompanySignUp handleFormStatus={this.handleFormStatus} />
          )}
        </TabPane>
      </Tabs>
    );
  }
}
