import React from "react";
import { Input } from "antd";
import { useDispatch } from "react-redux";
//import { setSearch } from "../js/actions/index";
const { Search } = Input;

function SearchComp() {
  const dispatch = useDispatch();

  return (
    <div className="search-container" style={{ padding: "1.5% 5% 0.5% 2%" }}>
      <Search
        placeholder="Enter a search term here"
        enterButton="Search"
        size="large"
        //onSearch={title => dispatch(setSearch(title))}
      />
    </div>
  );
}

export default SearchComp;
