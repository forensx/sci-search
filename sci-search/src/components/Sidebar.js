import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { useDispatch, useSelector } from "react-redux";
//import { sidebarToggle } from "../js/actions/index";
import BookmarkList from "./bookmarks/BookmarkList";
const { Sider } = Layout;
const { SubMenu } = Menu;

// 1. Get all cases with bookmarks
// 2. Iterate through cases
// 3. Iterate through bookmarks
// 4. Retrieve bookmark paper details in console.log()

function Sidebar() {
  const bookmarksByCases = useSelector((state) => state.bookmarksByCases);
  //const dispatch = useDispatch();

  return (
    <Sider collapsible>
      <Menu
        theme="dark"
        defaultSelectedKeys="miscExplanationHeader"
        mode="inline"
      >
        <Menu.Item key="miscExplanationHeader">Bookmarked Papers</Menu.Item>
        <SubMenu
          key="case1"
          title={
            <span>
              <span>Case 1</span>
            </span>
          }
        >
          <Menu.Item key="1">Bookmark 1</Menu.Item>
          <Menu.Item key="2">Bookmark 2</Menu.Item>
        </SubMenu>
        {bookmarksByCases ? (
          bookmarksByCases.map((result) => (
            <SubMenu
              key={result}
              title={
                <span>
                  <span>{result}</span>
                </span>
              }
            >
              <Menu.Item key="1">Bookmark 1</Menu.Item>
              <Menu.Item key="2">Bookmark 2</Menu.Item>
            </SubMenu>
          ))
        ) : (
          <SubMenu
            key="no cases found"
            title={
              <span>
                <span>"No cases found</span>
              </span>
            }
          ></SubMenu>
        )}
      </Menu>
    </Sider>
  );
}

export default Sidebar;
