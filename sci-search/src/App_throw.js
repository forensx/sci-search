import React, { Component } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import ResultList from "./components/results/ResultList";
import { Layout } from "antd";
import "antd/dist/antd.css";
import Search from "./components/Search";
import Sidebar from "./components/Sidebar";
import { Tabs } from "antd";
const { TabPane } = Tabs;
const { Header, Content, Footer } = Layout;

export default class App extends Component {
  state = {
    windowHeight: window.innerHeight,
  };

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize = (e) => {
    console.log("Browser height is: ", window.innerHeight);
    this.setState({ windowHeight: window.innerHeight });
  };

  render() {
    return (
      <div>
        <Layout style={{ height: "100vh" }}>
          <Header style={{ color: "white", height: "6vh" }}>Sci-Search</Header>
          <Layout>
            <Sidebar />
            <Content>
              <div>
                <Search />
              </div>
              <div>
                <ResultList />
              </div>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}
