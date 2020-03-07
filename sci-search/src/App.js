import React, { Component } from "react";
import "antd/dist/antd.css";
import { Layout, Menu } from 'antd';
const { Header, Content, Sider } = Layout;

export default class App extends Component {
  state = {
    collapsed: false
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <div className="App">
        <Layout>
          <Header style={{ color: "white" }}>Sci Search</Header>
          <Layout style={{ minHeight: "100vh" }}>
            <Sider
              collapsible
              collapsed={this.state.collapsed}
              onCollapse={this.onCollapse}
            >
              <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
                <Menu.Item key="1">
                  <span>Case 1</span>
                </Menu.Item>
                <Menu.Item key="2">
                  <span>Case 2</span>
                </Menu.Item>
              </Menu>
            </Sider>
            <Content>
              <div>Search here</div>
              <div>Papers here</div>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}
