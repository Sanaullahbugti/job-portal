import React, { Component } from "react";
import { Tabs } from "antd";
import Students from "../home/Students";
import Jobs from "./Jobs";
import Companies from "./Companies";
export default class AdminDashboard extends Component {
  render() {
    const TabPane = Tabs.TabPane;
    return (
      <Tabs defaultActiveKey="1">
        <TabPane tab="Students" key="1">
          <Students />
        </TabPane>
        <TabPane tab="Companies" key="2">
          <Companies/>
        </TabPane>
        <TabPane tab="Jobs" key="3" ><Jobs/></TabPane>
      </Tabs>
    );
  }
}
