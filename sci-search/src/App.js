import React, { Component } from "react";
import "./App.css";
import ResultList from "./components/results/ResultList";
import { Layout, Menu } from "antd";
import "antd/dist/antd.css";
import Search from "./components/Search";
import BookmarkList from "./components/bookmarks/BookmarkList";
import { search_api } from "./components/DataFunctions";
import { Result } from "antd";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { message } from "antd";
import Sidebar from "./components/Sidebar";

const { Header, Content, Sider } = Layout;

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
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}
