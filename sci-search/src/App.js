import React, { Component } from "react";
import "./App.css";
import ResultList from "./components/results/ResultList";
import uuid from "uuid";
import { Layout, Menu } from 'antd';
import "antd/dist/antd.css";
import Search from "./components/search";
import { search_api } from "./components/DataFunctions";

const { Header, Content, Sider } = Layout;


class App extends Component {
  state = {
    collapsed: false,
    searchTerm: ""
  };


  onCollapse = collapsed => {
    console.log("Sidebar toggled: ", collapsed);
    this.setState({ collapsed });
  };

  setSearch = search => {
    console.log("User searched (setting in App): ", search);
    this.setState({ searchTerm: search });

    // API call from Flask
    search_api(search);
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
              <div>
                <Search setSearch={this.setSearch} />
              </div>
              <div><ResultList results={this.state.results}/></div>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
export default App;
