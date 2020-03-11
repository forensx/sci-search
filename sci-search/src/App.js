import React, { Component } from "react";
import "./App.css";
import ResultList from "./components/results/ResultList";
import uuid from "uuid";
import { Layout, Menu } from "antd";
import "antd/dist/antd.css";
import Search from "./components/Search";
import BookmarkList from "./components/bookmarks/BookmarkList";
import { search_api } from "./components/DataFunctions";
import { Result, Button } from "antd";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { message } from "antd";

const { Header, Content, Sider } = Layout;

class App extends Component {
  state = {
    collapsed: false,
    searchTerm: "",
    results: [],
    bookmarks: [],
    isLoading: false
  };

  onCollapse = collapsed => {
    console.log("Sidebar toggled: ", collapsed);
    this.setState({ collapsed });
  };

  setSearch = search => {
    console.log("User searched (setting in App): ", search);
    this.setState({ searchTerm: search, isLoading: true });

    console.log("User is now loading papers: ", this.state.isLoading);

    // API call from Flask
    search_api(search)
      .then(response => {
        console.log("Response: ", response.data.results);
        this.setState({ results: response.data.results, isLoading: false });
        console.log("User is done loading papers: ", this.state.isLoading);
      })
      .catch(err => {
        console.log(err);
      });
  };

  addBookmark = tempBookmark => {
    console.log(tempBookmark);
    if (tempBookmark.title !== "") {
      this.setState({ bookmarks: [...this.state.bookmarks, tempBookmark] });
    }
    message.success("Paper bookmarked!", 1);
    window.localStorage.setItem(
      "userBookmark",
      JSON.stringify(this.state.bookmarks)
    );
  };

  removeBookmark = id => {
    console.log("Removed", id);
    this.setState({
      bookmarks: [
        ...this.state.bookmarks.filter(bookmark => bookmark.ID !== id)
      ]
    });
    message.warning("Paper removed from bookmarks.", 1);
    window.localStorage.setItem(
      "userBookmarks",
      JSON.stringify(this.state.bookmarks)
    );
  };

  componentDidMount() {
    this.userBookmarks = JSON.parse(
      window.localStorage.getItem("userBookmarks")
    );

    if (window.localStorage.getItem("userBookmarks")) {
      console.log("Bookmarks on user device exist");
      this.setState({ bookmarks: this.userBookmarks });
    } else {
      console.log("Bookmarks on user device DO NOT exist");
      this.setState({ bookmarks: [] });
    }
  }

  render() {
    return (
      <div className="App">
        <Layout>
          <Header style={{ color: "white", fontSize: "24px" }}>
            Sci-Search
          </Header>
          <Layout style={{ minHeight: "90vh" }}>
            <Sider
              collapsible
              collapsed={this.state.collapsed}
              onCollapse={this.onCollapse}
            >
              <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
                <Menu.Item key="1">
                  <span>Bookmarked Papers</span>
                </Menu.Item>
              </Menu>
              <BookmarkList
                bookmarks={this.state.bookmarks}
                style={{ padding: "0%", margin: "0%" }}
                addBookmark={this.addBookmark.bind(this)}
                removeBookmark={this.removeBookmark.bind(this)}
              />
            </Sider>
            <Content>
              <div>
                <Search setSearch={this.setSearch} />
              </div>
              <div>
                {this.state.isLoading ? (
                  <Result
                    title="Your search has been executed"
                    icon={
                      <Spin
                        size="large"
                        indicator={
                          <LoadingOutlined style={{ fontSize: 50 }} spin />
                        }
                      />
                    }
                  />
                ) : (
                  <ResultList
                    results={this.state.results}
                    addBookmark={this.addBookmark}
                    removeBookmark={this.removeBookmark}
                  />
                )}
              </div>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default App;
