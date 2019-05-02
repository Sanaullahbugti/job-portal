import React, { Component } from "react";
import { Tabs } from "antd";
import Login from "../login/Login";
import CompanyDashboard from "./CompanyDashboard";
import StudentDashboard from "./StudentDashboard";

const TabPane = Tabs.TabPane;
export default class Dashboard extends Component {
  state = {
    name: "",
    password: ""
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
        console.log("respons data", json[0]);
        this.setState({ currentStudent: json[0] });
      })
      .catch(err => {
        console.log("err:", err);
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
      .then(res => res.json())
      .then(json => {
        console.log("respons data", json[0]);
        this.setState({ currentUser: json[0] });
      })
      .catch(err => {
        console.log("err:", err);
      });
  };
  handleClick = () => {
    this.props.role === "student" ? this.login() : this.loginCompany();
  };
  render() {
    const { name, password, currentUser, currentStudent } = this.state;
    console.log("current Student ", currentStudent);
    return currentUser ? (
      <CompanyDashboard currentUser={currentUser} />
    ) : currentStudent ? (
      <StudentDashboard currentStudent={currentStudent} />
    ) : (
      <Tabs defaultActiveKey="1">
        <TabPane tab="Login As Student" key="1">
          <Login
            role="student"
            name={name}
            password={password}
            handleClick={this.handleChange}
            handleChange={evt => this.handleChange(evt)}
            login={this.login}
          />
        </TabPane>
        <TabPane tab="Login As Company" key="2">
          <Login
            role="company"
            name={name}
            password={password}
            handleClick={this.handleChange}
            handleChange={evt => this.handleChange(evt)}
            login={this.loginCompany}
          />
        </TabPane>
      </Tabs>
    );
  }
}
