import React, { Component } from "react";
import { Button, Card, Icon } from "antd";
export default class Companies extends Component {
  state = {
    loading: true
  };
  componentDidMount() {
    this.getAllCompanies();
  }
  handleClick = evt => {
    const id = evt.target.value;
    fetch("http://localhost:4000/companies/ban", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id })
    })
      .then(res => res.json)
      .then(json => {
        this.getAllCompanies();
      });
  };
  getAllCompanies = () => {
    fetch("http://localhost:4000/companies/getall", {
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
  render() {
    const { getData } = this.state;
    const gridStyle = {
      width: "33%",
      textAlign: "center"
    };
    return getData ? (
      <Card title="All Companies ">
        {getData.map(
          rec =>
            rec.name && (
              <Card.Grid style={gridStyle}>
                <Card
                  title={rec.name}
                  headStyle ={{backgroundColor:"powderblue"}}
                  extra={
                    <Button
                      value={rec._id}
                      onClick={evt => this.handleClick(evt)}
                    >
                      <Icon
                        type="delete"
                        theme="filled"
                        style={{ color: "red" }}
                      />
                    </Button>
                  }
                  style={{ width: "100%" }}
                >
                  {rec.description.length <= 15 ? (
                    <p>description:{rec.description}</p>
                  ) : (
                    <p>description:{rec.description.substring(0, 15)}...</p>
                  )}
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
          extra={<Button />}
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
