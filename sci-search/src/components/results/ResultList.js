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

export class ResultList extends Component {
  render() {
    return this.props.results.map(result => (
      <Paper results={result} key={result.ID} />
    ));
  }
}
ResultList.propTypes = {
  results: PropTypes.array.isRequired
};

export default ResultList;
