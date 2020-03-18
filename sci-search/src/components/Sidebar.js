import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { useDispatch, useSelector } from "react-redux";
//import { sidebarToggle } from "../js/actions/index";
import BookmarkList from "./bookmarks/BookmarkList";
const { Sider } = Layout;

function Sidebar() {
  
  const bookmarks = [];
  //const sidebarCollapsed = useSelector(state => state.sidebar.sidebarCollapsed);
  //const dispatch = useDispatch();

  return (
    <Sider
      collapsible
      //collapsed={sidebarCollapsed}
      //onCollapse={() => dispatch(sidebarToggle(!sidebarCollapsed))}
    >
      <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
        <Menu.Item key="1">
          <span>Bookmarked Papers</span>
        </Menu.Item>
      </Menu>
      <BookmarkList
        bookmarks={bookmarks}
        style={{ padding: "0%", margin: "0%" }}
      />
    </Sider>
  );
}

export default Sidebar;
