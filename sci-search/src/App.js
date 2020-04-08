import React, { Component } from "react";
import { Layout, Menu } from "antd";
import Search from "./components/Search";
import ResultList from "./components/results/ResultList";
import "antd/dist/antd.css";
import "./App.css";
import Sidebar from "./components/Sidebar";

const { Header, Content } = Layout;

export default class App extends Component {
  state = {
    currentView: "search",
  };
  handleNavRender(e) {
    console.log("click ", e);
    this.setState({ currentView: e.key });
  }

  render() {
    return (
      <div>
        <Layout style={{ height: "100vh" }}>
          <Header className="header">
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={[this.state.current]}
              onClick={this.handleNavRender}
              selectedKeys={[this.state.current]}
            >
              <Menu.Item key="search">Search</Menu.Item>
              <Menu.Item key="bookmarksView">Bookmarks</Menu.Item>
            </Menu>
          </Header>
          <Layout>
            <Sidebar />
            <Layout style={{ padding: "0 24px 24px" }}>
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
          </Layout>
        </Layout>
      </div>
    );
  }
}
