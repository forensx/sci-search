import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import SearchHome from "./components/results/SearchHome";
import BookmarkHome from "./components/bookmarks/BookmarksHome";
import "antd/dist/antd.css";
import "./App.css";

const { Header } = Layout;

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Layout style={{ height: "100vh" }}>
            <Header
              className="header"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div className="logo" />
              <Menu theme="dark" mode="horizontal" style={{ float: "right" }}>
                <Menu.Item key="search">
                  <Link to={"/"}> Search </Link>
                </Menu.Item>
                <Menu.Item key="bookmarksView">
                  <Link to={"/bookmarks"}> Bookmarks </Link>
                </Menu.Item>
              </Menu>
            </Header>
            <Layout>
              <Switch>
                <Route exact path="/" component={SearchHome} />
                <Route path="/bookmarks" component={BookmarkHome} />
              </Switch>
            </Layout>
          </Layout>
        </div>
      </Router>
    );
  }
}
