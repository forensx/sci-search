import React, { Component } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import ResultList from "./components/results/ResultList";
import { Layout } from "antd";
import "antd/dist/antd.css";
import Search from "./components/Search";
import Sidebar from "./components/Sidebar";
const { Header, Content } = Layout;

export default function App() {
  return (
    <div className="App">
      <Layout>
        <Header style={{ color: "white", fontSize: "24px" }}>Sci-Search</Header>
        <Layout style={{ minHeight: "90vh" }}>
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
