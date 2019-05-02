import React, { Component } from "react";
import { Form, Input, Icon, Button, Alert,notification} from "antd";
import Title from "antd/lib/typography/Title";
import TextArea from "antd/lib/input/TextArea";
export default class StudentSignUp extends Component {
  state = {
    name: "",
    password: "",
    summery: "",
    visible: true
  };
  handleChange = evt => {
    const text = evt.target.value;
    const name = evt.target.name;
    this.setState({
      [name]: text
    });
  };
   openNotificationWithIcon = () => {
    notification['success']({
      message: 'Record Added',
      description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    });
  };
 

  handleSubmit = () => {
    var studentData = this.state;
    fetch("http://localhost:4000/students/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(studentData)
    }).then(res => {
      console.log("res", res);
      if (res.status == 200) {
        setTimeout(() => {
          this.props.handleFormStatus();
        }, 5000);
       this.openNotificationWithIcon();
      }
    });
  };
  render() {
    const { name, password, summery } = this.state;
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
            Student Registeration form
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
            placeholder="Password"
            name="password"
            value={password}
            onChange={evt => this.handleChange(evt)}
            style={{ marginBottom: "5%" }}
          />
          <TextArea
            rows={3}
            placeholder="Summery"
            style={{ marginBottom: "5%" }}
            name="summery"
            onChange={evt => this.handleChange(evt)}
            value={summery}
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
