import React, { Component } from "react";
import { connect } from "react-redux";
import { Result } from "antd";
import { Spin } from "antd";
import { LoadingOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import Paper from "./Paper";

const mapStateToProps = (state) => ({
  currentSearch: state.selectedQuery,
  searchResults: state.papersByquery,
}); // connect props to state store in Redux

class ResultListWrapper extends Component {
  constructor(props) {
    super(props);
    this.loadingRender = this.loadingRender.bind(this);
  }

  loadingRender() {
    if (this.props.currentSearch === null) {
      return (
        <Result
          icon={<ExclamationCircleOutlined />}
          title="Enter a search query to get started!"
        />
      );
    } else if (
      this.props.searchResults[this.props.currentSearch]["isFetching"]
    ) {
      return (
        <Result
          title="Finding the most relevant results!"
          icon={
            <Spin
              size="large"
              indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />}
            />
          }
        />
      );
    } else {
      let paperList = this.props.searchResults[this.props.currentSearch][
        "papers"
      ].sort((a, b) => (a.ppindex > b.ppindex ? -1 : 1));
      return paperList.map((result) => (
        <Paper result={result} key={result.ID} />
      ));
    }
  }

  render() {
    return <div className="ResultList">{this.loadingRender()}</div>;
  }
}

const ResultList = connect(mapStateToProps)(ResultListWrapper); // connect to Redux state
export default ResultList; // this is the component that is used in App
