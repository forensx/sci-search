import React, { Component } from "react";
import "./App.css";
import ResultList from "./components/results/ResultList";
import uuid from "uuid";
import { Layout, Menu } from "antd";
import "antd/dist/antd.css";
import Search from "./components/Search";
import { search_api } from "./components/DataFunctions";
import Bookmarks from "./components/bookmarks/Bookmarks";

const { Header, Content, Sider } = Layout;

class App extends Component {
  state = {
    collapsed: false,
    searchTerm: "",
    results: [],
    bookmarks: [
    ]
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  setSearch = search => {
    console.log("User searched: ", search);
    this.setState({ searchTerm: search });

    // API call from Flask
    search_api(search)
      .then(response => {
        console.log("Response: ", response.data.results);
        this.setState({ results: response.data.results });
        
        // let paperIDs=[]
        // for (let i=0; i < this.state.results.length; i++) {
        //   paperIDs.push(uuid.v4())
          
        // }
        // this.setState({results : [...this.state.results,paperIDs]})
        // console.log("IDs added", this.state.results)
      })
      .catch(err => {
        console.log(err);
      });
  };

  addBookmark = tempBookmark => {
    this.setState({ bookmarks: [...this.state.bookmarks, tempBookmark] });
  };

  delBookmark = bookmarkTitle => {
    this.setState({
      bookmarks: [
        ...this.state.bookmarks.filter(
          bookmark => bookmark !== bookmarkTitle
        )
      ]
    });
  };

  render() {
    return (
      <div className="App">
        <Layout>
          <Header style={{ color: "white", fontSize: "26px" }}>Sci-Search</Header>
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
              <Bookmarks
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
                  delBookmark={this.delBookmark}
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
