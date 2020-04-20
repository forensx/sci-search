import React, { Component } from "react";
import Search from "../Search";
import ResultList from "./ResultList";
import Sidebar from "../Sidebar";
import { Layout } from "antd";
const { Content } = Layout;

export default class SearchHome extends Component {
  render() {
    return (
      <React.Fragment>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Sidebar />
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: "#f0f2f5",
            }}
          >
            <Search />
            <ResultList />
          </Content>
        </Layout>
      </React.Fragment>
    );
  }
}
