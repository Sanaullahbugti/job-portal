import React, { Component } from "react";
import { Card, Tabs } from "antd";
import JobPost from "../JobPost/JobPost";
import JobApplied from "./JobApplied";
export default class CompanyDashboard extends Component {
  state = {
    loading: true,
    currentUser: ""
  };
  componentWillMount() {
    this.getAllStudents();
    this.getJobsById();
  }
  logout = () => {
    localStorage.removeItem("currentUser");
  };
  getAllStudents = () => {
    fetch("http://localhost:4000/students/getall", {
      method: "GET"
    })
      .then(res => res.json())
      .then(json => {
        this.setState({
          getData: json
        });
      });
  };
  getJobsById = () => {
    fetch("http://localhost:4000/getjob/id", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id: this.props.location.state.currentUser._id })
    })
      .then(res => res.json())
      .then(json => {
        this.setState({
          postedJobs: json
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
    const { name, _id } = this.props.location.state.currentUser;
    const { getData, appliedStudents } = this.state;
    console.log(appliedStudents);
    const gridStyle = {
      width: "33%",
      textAlign: "center"
    };
    const TabPane = Tabs.TabPane;
    console.log("props are here ", this.props);
    return getData ? (
      <Tabs defaultActiveKey="1" onChange={key => this.callback(key)}>
        <TabPane tab="View All Students" key="1">
          {" "}
          <Card title="All Students ">
            {getData.students.map(
              rec =>
                rec.name && (
                  <Card.Grid style={gridStyle}>
                    <Card
                      title={rec.name}
                      extra={<a href="#">More</a>}
                      headStyle={{
                        width: "100%",
                        backgroundColor: "powderblue"
                      }}
                      bodyStyle={{ width: "100%" }}
                    >
                      {rec.summery.length <= 15 ? (
                        <p>Summery:{rec.summery}</p>
                      ) : (
                        <p>Summery:{rec.summery.substring(0, 15)}...</p>
                      )}
                      skills{" "}
                      {rec.skills.map(rec => (
                        <p>{rec}</p>
                      ))}
                    </Card>
                  </Card.Grid>
                )
            )}
          </Card>
        </TabPane>
        <TabPane tab="Post a Job" key="2">
          <JobPost postedBy={_id} />
        </TabPane>
        <TabPane tab={name} key="3">
          <JobApplied
            currentUser={this.props.currentUser}
            getData={getData}
            postedJobs={this.state.postedJobs}
          />
        </TabPane>
        <TabPane tab="Logout" key="4" textAlign="right" />
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
