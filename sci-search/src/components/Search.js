import React from "react";
import { Input } from "antd";
import { useDispatch } from "react-redux";
import { selectQuery, fetchPapersIfNeeded } from "../js/actions/index";
const { Search } = Input;

function SearchComp() {
  const dispatch = useDispatch();

  const sendSearch = title => {
    dispatch(selectQuery(title));
    dispatch(fetchPapersIfNeeded(title));
  };

  return (
    <div className="search-container" style={{ padding: "1.5% 5% 0.5% 2%" }}>
      <Search
        placeholder="Enter a search term here"
        enterButton="Search"
        size="large"
        onSearch={title => sendSearch(title)}
      />
    </div>
  );
}

export default SearchComp;
