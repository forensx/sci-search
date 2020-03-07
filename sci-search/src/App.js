import React, { Component } from "react";
import "./App.css";
import "antd/dist/antd.css";
import { Layout, Menu } from "antd";

const { Header, Content, Footer, Sider } = Layout;

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Header>SciSearch</Header>
          <Layout>
            <Content>main content</Content>
            <Sider>
              <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
                <Menu.Item key="1">
                  <span>Case 1</span>
                </Menu.Item>
              </Menu>
            </Sider>
          </Layout>
        </Layout>
      </div>
    );
  }
}
