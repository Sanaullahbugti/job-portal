import React, { Component } from "react";
import { Button, Input, Form, Typography,notification  } from "antd";
import TextArea from "antd/lib/input/TextArea";

export default class JobPost extends Component {
  state = {
    title: "",
    description: "",
    salary: 0,
    level: "",
    postedBy: ""
  };
  componentDidMount = () => {
    this.setState({ postedBy: this.props.postedBy });
  };
  handleChange = evt => {
    const { value, name } = evt.target;
    this.setState({
      [name]: value
    });
  };
  clear=()=>{
    this.setState({
      title:"",
      description: "",
      salary: 0,
      level: "",
      postedBy: ""
    })
  }
  handleNumberChange = e => {
    const salary = parseInt(e.target.value || 0, 10);
    if (Number.isNaN(salary)) {
      return;
    }
    if (!("value" in this.props)) {
      this.setState({ salary });
    }
  };
  handleClick = () => {
    this.postJob();
  };
   openNotificationWithIcon = () => {
    notification['success']({
      message: 'Job Successfully added Added',
    });
  };
  postJob = () => {
    var jobData = this.state;
    fetch("http://localhost:4000/jobs/postjob", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(jobData)
    }).then(res => {
      if(res.status==200){
        this.openNotificationWithIcon()
        this.clear();
      }
    });
  };
  render() {
    const { Title } = Typography;
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
          onSubmit={this.handleSubmit}
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
            Post a Job Here
          </Title>
          Job Title:
          <Input
            placeholder="EXAMPLE MERN STACK"
            style={{ marginBottom: "3%" }}
            name="title"
            value={this.state.title}
            onChange={evt => this.handleChange(evt)}
          />
          Job Description:
          <TextArea
            rows={2}
            placeholder="Description"
            style={{ marginBottom: "3%" }}
            name="description"
            value={this.state.description}
            onChange={evt => this.handleChange(evt)}
          />
          Salary{" "}
          <Input
            type="text"
            name=""
            value={this.state.salary}
            onChange={this.handleNumberChange}
            style={{ width: "100%", marginBottom: "3%" }}
          />
          Level Of Job:
          <Input
            placeholder="Junior/Senior"
            style={{ marginBottom: "3%" }}
            name="level"
            value={this.state.level}
            onChange={evt => this.handleChange(evt)}
          />
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{ width: "100%", marginBottom: "3%" }}
            onClick={this.handleClick}
          >
            Post Job
          </Button>
        </Form>
      </div>
    );
  }
}
