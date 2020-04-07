import React, { Component } from "react";
import { connect } from "react-redux";
import { Layout, Menu, message, Input, Card } from "antd";
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
    this.state = { caseRender: "" };
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleNewUserCase = this.handleNewUserCase.bind(this);
  }

  handleMenuClick = (e) => {
    const { dispatch } = this.props;
    if (e.key === "caseUserInput") {
      this.setState({ visible: true });
      console.log("User clicked: ", e.key);
    } else {
      this.setState({ caseRender: e.key, visible: false });
      console.log("User clicked: ", e.key);
    }
  };

  handleVisibleChange = (flag) => {
    this.setState({ visible: flag });
  };

  handleNewUserCase = (e) => {
    const { dispatch } = this.props;
    if (e.key === "Enter") {
      message.success("Case " + e.target.value + "created!", 1);
    }
  };

  render() {
    const userCases = Object.keys(this.props.allCases);
    return (
      <div>
        <Sider collapsible width={400} style={{ background: "#002140" }}>
          <Menu
            theme="dark"
            defaultSelectedKeys="miscExplanationHeader"
            mode="vertical"
            style={{ background: "#002140", minHeight: "84vh" }}
            onClick={this.handleMenuClick}
            visible={this.state.visible}
          >
            <SubMenu
              key="chooseCaseHeader"
              visible={this.state.visible}
              title={
                <span>
                  <span>Choose a case</span>
                </span>
              }
            >
              <Menu.ItemGroup>
                {userCases
                  ? userCases.map((result) => (
                      <Menu.Item onClick={this.handleMenuClick} key={result}>
                        {result}
                      </Menu.Item>
                    ))
                  : null}
                <Menu.Item key="caseUserInput">
                  <Input placeholder="Create new case" id="userNewCaseInput" />
                </Menu.Item>
              </Menu.ItemGroup>
            </SubMenu>
            {this.state.caseRender
              ? this.props.allCases[this.state.caseRender].bookmarks.map(
                  (bookmark) => (
                    <Card
                      size="small"
                      title={bookmark.title.replace(
                        /(([^\s]+\s\s*){5})(.*)/,
                        "$1…"
                      )}
                      extra={<a href={bookmark.doi}>Paper link</a>}
                      style={{ marginTop: "2px" }}
                    >
                      <p>
                        {bookmark.abstract.replace(
                          /(([^\s]+\s\s*){20})(.*)/,
                          "$1…"
                        )}
                      </p>
                    </Card>
                  )
                )
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
