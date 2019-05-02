import React, { Component } from "react";
import { Card, Icon, Button } from "antd";
export default class Students extends Component {
  state = {
    loading: true
  };
  componentDidMount() {
    this.getAllStudents();
  }

  getAllStudents = () => {
    fetch("http://localhost:4000/students/getall", {
      method: "GET"
    })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        this.setState({
          getData: json
        });
      });
  };
  handleClick = evt => {
    const id = evt.target.value;
    fetch("http://localhost:4000/students/ban", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id })
    })
      .then(res => res.json)
      .then(json => {
        this.getAllStudents();
      });
  };
  render() {
    const { getData } = this.state;
    const gridStyle = {
      width: "33%",
      textAlign: "center"
    };
    return getData ? (
      <Card title="All Students ">
        {getData.students.map(
          rec =>
            rec.name && (
              <Card.Grid style={gridStyle}>
                <Card
                  title={rec.name}
                  headStyle={{ backgroundColor: "powderblue" }}
                  extra={
                    <Button
                      value={rec._id}
                      onClick={evt => this.handleClick(evt)}
                    >
                      {" "}
                      <Icon
                        type="delete"
                        theme="filled"
                        style={{ color: "red" }}
                      />
                    </Button>
                  }
                  style={{ width: "100%" }}
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
    ) : (
      <Card.Grid style={gridStyle}>
        {" "}
        <Card
          loading={this.state.loading}
          hoverable
          title="Loading Students"
          extra={<a href="#">More</a>}
          style={{ width: 350 }}
        >
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>{" "}
        <Card
          loading={this.state.loading}
          hoverable
          title="Loading Students"
          extra={<a href="#">More</a>}
          style={{ width: 350 }}
        >
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>{" "}
        <Card
          loading={this.state.loading}
          hoverable
          title="Loading Students"
          extra={<a href="#">More</a>}
          style={{ width: 350 }}
        >
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
      </Card.Grid>
    );
  }
}
