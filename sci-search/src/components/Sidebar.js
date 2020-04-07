import React, { Component } from "react";
import { connect } from "react-redux";
import { Layout, Menu } from "antd";
import CiteExport from "./bookmarks/CiteExport";
const { Sider } = Layout;
const { SubMenu } = Menu;

// 1. Get all cases with bookmarks
// 2. Iterate through cases
// 3. Iterate through bookmarks
// 4. Retrieve bookmark paper details in console.log()

const mapStateToProps = (state) => ({
  allCases: state.bookmarksByCase,
}); // connect props to state store in Redux

class SidebarWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const userCases = Object.keys(this.props.allCases);
    return (
      <div>
        <Sider collapsible>
          <Menu
            theme="dark"
            defaultSelectedKeys="miscExplanationHeader"
            mode="inline"
          >
            {userCases
              ? userCases.map((result) => (
                  <SubMenu
                    key={this.props.allCases[result].ID}
                    title={
                      <span>
                        <span>{result}</span>
                      </span>
                    }
                    multiple={false}
                  >
                    {this.props.allCases[result].bookmarks.map((bookmark) => (
                      <Menu.Item key={bookmark.ID}>{bookmark.title}</Menu.Item>
                    ))}
                  </SubMenu>
                ))
              : null}
          </Menu>
          <CiteExport/>
        </Sider>
      </div>
    );
  }
}

const Sidebar = connect(mapStateToProps)(SidebarWrapper); // connect to Redux state
export default Sidebar; // this is the component that is used in App
