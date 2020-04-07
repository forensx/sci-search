import React, { Component } from "react";
import { connect } from "react-redux";
import { Layout, Menu, message, Input, Card } from "antd";
import CiteExport from "./bookmarks/CiteExport";
const { Sider } = Layout;
const { SubMenu } = Menu;

const mapStateToProps = (state) => ({
  allCases: state.bookmarksByCase,
}); // connect props to state store in Redux
class SidebarWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = { caseRender: null };
  }
  handleMenuClick = (e) => {
    this.setState({ caseRender: e.key, visible: true });
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
          >
            <SubMenu
              key="sub1"
              title={
                this.state.caseRender
                  ? "Viewing: " + this.state.caseRender
                  : "Choose a case"
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
                      extra={
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={bookmark.url}
                        >
                          Paper link
                        </a>
                      }
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
          <CiteExport caseNameProp={this.state.caseRender} />
        </Sider>
      </div>
    );
  }
}
const Sidebar = connect(mapStateToProps)(SidebarWrapper); // connect to Redux state
export default Sidebar; // this is the component that is used in App
