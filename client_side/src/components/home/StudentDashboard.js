import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import { Card, Skeleton, Tabs, Button } from "antd";
import StudentSignUp from "../signup/StudentSignUp";
import Dashboard from "./Dashboard";
import JobPost from "../JobPost/JobPost";
export default class StudentDashboard extends Component {
  state = {
    loading: true,
    currentStudent: "",
    jobId: "",
    userId: ""
  };
  componentDidMount() {
    this.getAllJobs();
  }
  logout = () => {
    localStorage.removeItem("currentStudent");
  };
  applyForJob = evt => {
    const appliedBy = this.props.location.state.currentStudent._id;
    const jobId = evt.target.value;
    fetch("http://localhost:4000/jobs/apply", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ appliedBy, jobId })
    }).then(res => {
      if (res.status === 200) {
        this.getAllJobs();
      }
    });
  };
  getAllJobs = () => {
    fetch("http://localhost:4000/jobs/getall", {
      method: "GET"
    })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        this.setState({
          getData: json.jobs.filter(rec => {
            let a = rec.appliedBy.filter(
              rec => rec === this.props.location.state.currentStudent._id
            );
            console.log("array", a);
            return a.length == 0
          }),
          appliedJob: json.jobs.filter(rec => {
            let a = rec.appliedBy.filter(
              rec => rec === this.props.location.state.currentStudent._id
            );
            return a.length > 0;
          })
        });
      });
  };
  callback = key => {
    if (key == 4) {
      this.logout();
      this.props.history.push({
        pathname: "/"
      });
    }
  };
  render() {
    const { name, _id, size } = this.props.location.state.currentStudent;
    console.log("applied Job", this.state.appliedJob);
    const { getData, appliedJob } = this.state;
    const gridStyle = {
      width: "33%",
      textAlign: "center"
    };
    const TabPane = Tabs.TabPane;
    return getData ? (
      <Tabs defaultActiveKey="1" onChange={key => this.callback(key)}>
        <TabPane tab="View New Jobs" key="1">
          {" "}
          <Card title="New Jobs " key={_id}>
            {getData.map(
              rec =>
                rec.title && (
                  <Card.Grid style={gridStyle}>
                    <Card
                      title={rec.title}
                      headStyle={{ backgroundColor: "powderblue" }}
                      extra={
                        <Button
                          type="primary"
                          value={rec._id}
                          onClick={evt => this.applyForJob(evt)}
                        >
                          Apply
                        </Button>
                      }
                      style={{ width: "100%" }}
                    >
                      {rec.description.length <= 15 ? (
                        <p>Description:{rec.description}</p>
                      ) : (
                        <p>Description:{rec.description.substring(0, 15)}...</p>
                      )}
                      Salary:<span>{rec.salary}</span>
                      <br />
                      Job Level: <span>{rec.level}</span>
                      <br />
                      <span>{rec.appliedBy.length}</span> peaples apply for this
                      job
                    </Card>
                  </Card.Grid>
                )
            )}
          </Card>
        </TabPane>

        <TabPane tab={name} key="3">
          <Card title="Applied Jobs ">
            {appliedJob.map(
              rec =>
                rec.title && (
                  <Card.Grid style={gridStyle}>
                    <Card
                      title={rec.title}
                      headStyle={{ backgroundColor: "powderblue" }}
                      extra={
                        <Button type="disabled" value={rec._id}>
                          Applied
                        </Button>
                      }
                      style={{ width: "100%" }}
                    >
                      {rec.description.length <= 15 ? (
                        <p>Description:{rec.description}</p>
                      ) : (
                        <p>Description:{rec.description.substring(0, 15)}...</p>
                      )}
                      Salary:<span>{rec.salary}</span>
                      <br />
                      Job Level: <span>{rec.level}</span>
                      <br />
                      <span>{rec.appliedBy.length}</span> peaples apply for this
                      job
                    </Card>
                  </Card.Grid>
                )
            )}
          </Card>
        </TabPane>
        <TabPane tab="Logout" key="4" />
      </Tabs>
    ) : (
      <Card
        loading={this.state.loading}
        hoverable
        title="Loading Students"
        extra={<a href="#">More</a>}
        style={{ width: 500, height: 500 }}
      >
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    );
  }
}
