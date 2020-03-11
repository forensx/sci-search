import React, { Component } from "react";
import { List, Avatar } from "antd";
import PropTypes from "prop-types";
import Paper from "./Paper";

const IconText = ({ icon, text }) => (
  <span>
    {React.createElement(icon, { style: { marginRight: 8 } })}
    {text}
  </span>
);

class ResultList extends Component {
  render() {
    let paperList = this.props.results.sort((a, b) =>
      a.ppindex > b.ppindex ? -1 : 1
    );
    return paperList.map(result => (
      <Paper
        addBookmark={this.props.addBookmark}
        removeBookmark={this.props.removeBookmark}
        results={result}
        key={result.ID}
      />
    ));
  }
}

ResultList.propTypes = {
  results: PropTypes.array.isRequired
};

export default ResultList;
