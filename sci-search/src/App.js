import React, { Component } from "react";
import "./App.css";
import ResultList from "./components/results/ResultList";
import uuid from "uuid";
import { Layout, Menu } from "antd";
import "antd/dist/antd.css";
import Search from "./components/Search";
import BookmarkList from "./components/bookmarks/BookmarkList";
import { search_api } from "./components/DataFunctions";

const { Header, Content, Sider } = Layout;

class App extends Component {
  state = {
    collapsed: false,
    searchTerm: "",
    results: [],
    bookmarks: []
  };

  onCollapse = collapsed => {
    console.log("Sidebar toggled: ", collapsed);
    this.setState({ collapsed });
  };

  setSearch = search => {
    console.log("User searched (setting in App): ", search);
    this.setState({ searchTerm: search });

    // API call from Flask
    search_api(search)
      .then(response => {
        console.log("Response: ", response.data.results);
        this.setState({ results: response.data.results });
      })
      .catch(err => {
        console.log(err);
      });
  };

  addBookmark = (title, id) => {
    console.log(title);
    if (title !== "") {
      const newBookmark = {
        id,
        title
      };
      this.setState({ bookmarks: [...this.state.bookmarks, newBookmark] });
    }
  };

  removeBookmark = id => {
    console.log("Removed", id)
    this.setState({
      bookmarks: [...this.state.bookmarks.filter(bookmark => bookmark.id !== id)]
    });
  };

  render() {
    return (
      <div className="App">
        <Layout>
          <Header style={{ color: "white", fontSize: "26px" }}>
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
              />
            </Sider>
            <Content>
              <div>
                <Search setSearch={this.setSearch} />
              </div>
              <div>
                <ResultList
                  results={this.state.results}
                  addBookmark={this.addBookmark}
                  removeBookmark={this.removeBookmark}
                />
              </div>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default App;
