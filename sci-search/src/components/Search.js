import React, { Component } from "react";
import { Input } from "antd";
const { Search } = Input;

export default class search extends Component {
  render() {
    return (
      <div className="search-container" style={{ padding: "1.5% 5% 0.5% 2%" }}>
        <Search
          placeholder="Enter a search term here"
          enterButton="Search"
          size="large"
          onSearch={this.props.setSearch}
        />
      </div>
    );
  }
}