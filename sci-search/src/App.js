import React, { Component } from "react";
import "./App.css";
import "antd/dist/antd.css";
import ResultList from "./components/results/ResultList";
import uuid from "uuid";
import { Layout, Menu } from 'antd';
const { Header, Content, Sider } = Layout;

class App extends Component {
  state = {
    collapsed: false,
    results: [
      {
        ID: uuid.v4(),
        title: "Paper 1",
        abstract:
          "majority of AD cases: Sporadic late onset AD (LOAD). Accumulation of DNA damage is a well-established aging factor. In this regard, a large amount"
        ,
        authors: ["John","Jill","Jake"],
        keywords: ["this","that"],
        confidenceInterval: 97,
        APA: "this is the APA citation",
        database: "SuperPapers.com",
        date: Date("3/7/20"),
        citationNumber: 5010,
        journal: "ohYUH"
      },
      {
        ID: uuid.v4(),
        title: "Paper 2",
        abstract:
          "majority of AD cases: Sporadic late onset AD (LOAD). Accumulation of DNA damage is a well-established aging factor. In this regard, a large amount"
        ,
        authors: ["John","Jill","Jake"],
        keywords: ["this","that"],
        confidenceInterval: 97,
        APA: "this is the APA citation",
        database: "SuperPapers.com",
        date: Date("3/7/20"),
        citationNumber: 76893,
        journal: "YEET"
      },
      {
        ID: uuid.v4(),
        title: "Paper 3",
        abstract:
          "majority of AD cases: Sporadic late onset AD (LOAD). Accumulation of DNA damage is a well-established aging factor. In this regard, a large amount"
        ,
        authors: ["John","Jill","Jake"],
        keywords: ["this","that"],
        confidenceInterval: 97,
        APA: "this is the APA citation",
        database: "SuperPapers.com",
        date: Date("3/7/20"),
        citationNumber: 76893,
        journal: "YEET"
      },
      {
        ID: uuid.v4(),
        title: "Paper 4",
        abstract:
          "majority of AD cases: Sporadic late onset AD (LOAD). Accumulation of DNA damage is a well-established aging factor. In this regard, a large amount"
        ,
        authors: ["John","Jill","Jake"],
        keywords: ["this","that"],
        confidenceInterval: 97,
        APA: "this is the APA citation",
        database: "SuperPapers.com",
        date: Date("3/7/20"),
        citationNumber: 76893,
        journal: "YEET"
      },
      {
        ID: uuid.v4(),
        title: "Paper 5",
        abstract:
          "majority of AD cases: Sporadic late onset AD (LOAD). Accumulation of DNA damage is a well-established aging factor. In this regard, a large amount"
        ,
        authors: ["John","Jill","Jake"],
        keywords: ["this","that"],
        confidenceInterval: 97,
        APA: "this is the APA citation",
        database: "SuperPapers.com",
        date: Date("3/7/20"),
        citationNumber: 76893,
        journal: "YEET"
      }
    ]
  };


  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
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
              <div>Search here</div>
              <div><ResultList/></div>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default App;
