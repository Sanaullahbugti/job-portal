import React, { Component } from "react";
import { Card, Button } from "antd";
export default class JobApplied extends Component {
  state = {};
  componentDidMount = () => {
    this.dataSetting();
  };

  dataSetting = () => {
    const { getData, postedJobs } = this.props;
    let appliedStudents = getData.students.filter(rec => {
      let ab = postedJobs.filter(r => {
        var a = r.appliedBy.filter(re => re == rec._id);
        console.log(a);
        return a.length > 0;
      });
      console.log("ab", ab);
      return ab.length > 0;
    });
    console.log("appply", appliedStudents);
    this.setState({
      appliedStudents
    });
  };

  render() {
    const { appliedStudents } = this.state;
    const gridStyle = {
      width: "33%",
      textAlign: "center"
    };
    return appliedStudents ? (
      <Card title="Applicants ">
        {appliedStudents.map(
          rec =>
            rec.name && (
              <Card.Grid style={gridStyle}>
                <Card
                  title={rec.name}
                  headStyle={{ backgroundColor: "powderblue" }}
                  extra={
                    <Button type="disabled" value={rec._id}>
                      Applied For Your Job
                    </Button>
                  }
                  style={{ width: "100%" }}
                >
                  {rec.summery.length <= 15 ? (
                    <p>Description:{rec.summery}</p>
                  ) : (
                    <p>Description:{rec.summery.substring(0, 15)}...</p>
                  )}
                  Skills{" "}
                  {rec.skills.map(rec => (
                    <p>{rec}</p>
                  ))}
                </Card>
              </Card.Grid>
            )
        )}
      </Card>
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
