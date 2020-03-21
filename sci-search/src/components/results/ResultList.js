import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Result } from "antd";
import { Spin } from "antd";
import { LoadingOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import Paper from "./Paper";

const mapStateToProps = state => ({
  currentSearch: state.selectedQuery,
  searchResults: state.papersByquery
});

class ResultListWrap extends Component {
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
          title="Your search has been executed"
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
      console.log("Sorted papers: ", paperList);
      return paperList.map(result => <Paper result={result} key={result.ID} />);
    }
  }

  render() {
    return <div className="ResultList">{this.loadingRender()}</div>;
  }
}

const ResultList = connect(mapStateToProps)(ResultListWrap);
export default ResultList;
