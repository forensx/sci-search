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
      {
        ID: uuid.v4(),
        title: "Paper 1 and some more extra words to make it longer",
        abstract:
          "majority of AD cases: Sporadic late onset AD (LOAD). Accumulation of DNA damage is a well-established aging factor. In this regard, a large amount",
        authors: ["John", "Jill", "Jake"],
        keywords: ["this", "that"],
        confidenceInterval: 97,
        APA: "this is the APA citation",
        database: "SuperPapers.com",
        date: Date("3/7/20"),
        citationNumber: 5010,
        journal: "myJournal"
      },
      {
        ID: uuid.v4(),
        title: "Paper 2",
        abstract:
          "majority of AD cases: Sporadic late onset AD (LOAD). Accumulation of DNA damage is a well-established aging factor. In this regard, a large amount",
        authors: ["John", "Jill", "Jake"],
        keywords: ["this", "that"],
        confidenceInterval: 97,
        APA: "this is the APA citation",
        database: "SuperPapers.com",
        date: Date("3/7/20"),
        citationNumber: 5010,
        journal: "myJournal"
      },
      {
        ID: uuid.v4(),
        title: "Paper 3",
        abstract: 
          "majority of AD cases: Sporadic late onset AD (LOAD). Accumulation of DNA damage is a well-established aging factor. In this regard, a large amount",
        authors: ["John", "Jill", "Jake"],
        keywords: ["this", "that"],
        confidenceInterval: 97,
        APA: "this is the APA citation",
        database: "SuperPapers.com",
        date: Date("3/7/20"),
        citationNumber: 5010,
        journal: "myJournal"
      },
      {
        ID: uuid.v4(),
        title: "Paper 4",
        abstract:
          "majority of AD cases: Sporadic late onset AD (LOAD). Accumulation of DNA damage is a well-established aging factor. In this regard, a large amount",
        authors: ["John", "Jill", "Jake"],
        keywords: ["this", "that"],
        confidenceInterval: 97,
        APA: "this is the APA citation",
        database: "SuperPapers.com",
        date: Date("3/7/20"),
        citationNumber: 5010,
        journal: "myJournal"
      }
    ]
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

  render() {
    return (
      <div className="App">
        <Layout>
          <Header style={{ color: "white" }}>Sci Search</Header>
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
              <Bookmarks bookmarks={this.state.bookmarks} style={{padding:"0%", margin: "0%"}}/>
            </Sider>
            <Content>
              <div>
                <Search setSearch={this.setSearch} />
              </div>
              <div>
                <ResultList results={this.state.results} />
              </div>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default App;
