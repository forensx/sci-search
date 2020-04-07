import React, { Component } from "react";
import { connect } from "react-redux";
import { removeCase } from "../js/actions";
import { Layout, Menu, message, Input, Card, Button } from "antd";
import CiteExport from "./bookmarks/CiteExport";
const { Sider } = Layout;
const { SubMenu } = Menu;

const mapStateToProps = (state, ownProps) => ({
  allCases: state.bookmarksByCase,
  height: ownProps.height,
}); // connect props to state store in Redux
class SidebarWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = { caseRender: null };
  }
  handleMenuClick = (e) => {
    this.setState({ caseRender: e.key, visible: true });
  };

  handleRemoveCase = (e) => {
    const { dispatch } = this.props;
    dispatch(removeCase(e.key));
  };

  render() {
    const userCases = Object.keys(this.props.allCases);
    return (
      <div>
        <Sider width={400} style={{ background: "#002140" }}>
          <Menu
            theme="dark"
            defaultSelectedKeys="miscExplanationHeader"
            mode="vertical"
            style={{ background: "#002140", height: this.props.height * 0.895 }}
          >
            <SubMenu
              key="sub1"
              title={
                this.state.caseRender
                  ? "Viewing: " + this.state.caseRender
                  : "Choose a case"
              }
            >
              <Menu.ItemGroup style={{ width: "350px" }}>
                {userCases
                  ? userCases.map((result) => (
                      <Menu.Item onClick={this.handleMenuClick} key={result}>
                        {result}
                      </Menu.Item>
                    ))
                  : null}
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
          <CiteExport
            caseNameProp={this.state.caseRender}
            style={{ position: "relative" }}
          />
        </Sider>
      </div>
    );
  }
}
const Sidebar = connect(mapStateToProps)(SidebarWrapper); // connect to Redux state
export default Sidebar; // this is the component that is used in App
