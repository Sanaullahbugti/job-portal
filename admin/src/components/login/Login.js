import React, { Component } from "react";
import { Form, Icon, Input, Button, Checkbox, Typography } from "antd";
import AdminDashboard from "../home/AdminDashboard";

export default class Login extends Component {
  state = {
    name: "",
    password: "",
    authed: false
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
    fetch("http://localhost:4000/admin/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, password })
    })
      .then(res => res.json())
      .then(json => {
        json.length > 0 &&
          this.setState({
            authed: true
          });
      })
      .catch(err => {
        console.log("err:", err);
      });
  };
  render() {
    const { Title } = Typography;
    const { name, password, authed } = this.state;
    return authed ? (
      <AdminDashboard />
    ) : (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {" "}
        <Form
          className="login-form"
          style={{
            marginTop: "10%",
            border: "2px solid grey",
            borderRadius: "2%",
            padding: "2%",
            width: "35%"
          }}
        >
          <Title
            style={{
              color: "rgb(64,169,255)"
            }}
          >
            {" "}
            Welcom To Job Portal{" "}
          </Title>

          <Input
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Username"
            style={{ marginBottom: "5%" }}
            name="name"
            onChange={evt => this.handleChange(evt)}
            value={name}
          />
          <Input
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            type="password"
            name="password"
            onChange={evt => this.handleChange(evt)}
            value={password}
            placeholder="Password"
            style={{ marginBottom: "5%" }}
          />

          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{ width: "100%", marginBottom: "5%" }}
            onClick={this.login}
          >
            Log in
          </Button>
        </Form>
      </div>
    );
  }
}
