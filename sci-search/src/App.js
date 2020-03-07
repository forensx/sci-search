import React, { Component } from "react";
import "./App.css";
import "antd/dist/antd.css";
import ResultList from "./components/results/ResultList";
import uuid from "uuid";

class App extends Component {
  state = {
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

  render() {
    return (
      <div className="App">
        <ResultList/>
      </div>
    );
  }
}

export default App;
