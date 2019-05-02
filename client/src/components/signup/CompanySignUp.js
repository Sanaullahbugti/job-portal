import React, { Component } from "react";
import { Form, Input, Icon, Button, notification } from "antd";
import Title from "antd/lib/typography/Title";
import TextArea from "antd/lib/input/TextArea";
export default class CompanySignUp extends Component {
  state = {
    name: "",
    password: "",
    description: "",
    size: 0
  };
  openNotificationWithIcon = () => {
    notification["success"]({
      message: "Your acount successfully created login please",
      description:
        "This is the content of the notification. This is the content of the notification. This is the content of the notification."
    });
  };
  handleChange = evt => {
    const text = evt.target.value;
    const name = evt.target.name;
    this.setState({
      [name]: text
    });
  };
  handleNumberChange = e => {
    const size = parseInt(e.target.value || 0, 10);
    if (Number.isNaN(size)) {
      return;
    }
    if (!("value" in this.props)) {
      this.setState({ size });
    }
  };
  handleSubmit = () => {
    var studentData = this.state;
    fetch("http://localhost:4000/company/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(studentData)
    }).then(res => {
      if (res) {
        setTimeout(() => {
          this.props.handleFormStatus();
        }, 5000);
        this.openNotificationWithIcon();
      }
    });
  };
  render() {
    const { name, password, description, size } = this.state;
    return (
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
            Regiter your company here
          </Title>
          Name
          <Input
            prefix={
              <Icon type="usergroup-add" style={{ color: "rgba(0,0,0,.25)" }} />
            }
            placeholder="Company  "
            style={{ marginBottom: "5%" }}
            name="name"
            onChange={evt => this.handleChange(evt)}
            value={name}
          />
          Password
          <Input
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={evt => this.handleChange(evt)}
            style={{ marginBottom: "5%" }}
          />
          Description
          <TextArea
            rows={3}
            placeholder="Company description"
            style={{ marginBottom: "5%" }}
            name="description"
            onChange={evt => this.handleChange(evt)}
            value={description}
          />
          Size Of Company{" "}
          <Input
            type="text"
            name="size"
            value={size}
            onChange={this.handleNumberChange}
            style={{ width: "100%", marginBottom: "3%" }}
          />
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{ width: "100%", marginBottom: "5%" }}
            onClick={this.handleSubmit}
          >
            Register
          </Button>
          Or{" "}
          <a href="" onClick={evt => this.props.handleFormStatus(evt)}>
            Already have a acount!
          </a>
        </Form>
      </div>
    );
  }
}
