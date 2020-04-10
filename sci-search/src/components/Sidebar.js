import React, { Component } from "react";
import { connect } from "react-redux";
import { Layout, Menu, Card, Modal } from "antd";
import CiteExport from "./bookmarks/CiteExport";
const { Sider } = Layout;
const { SubMenu } = Menu;

const mapStateToProps = (state, ownProps) => ({
  allCases: state.bookmarksByCase,
}); // connect props to state store in Redux
class SidebarWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = { caseRender: null, modalVisible: false };
  }
  handleMenuClick = (e) => {
    if (e.key !== "createNewCase") {
      this.setState({ caseRender: e.key, visible: true });
    } else {
      console.log("Modal case activated!");
    }
  };

  handleRemoveCase = (e) => {
    //const { dispatch } = this.props;
  };

  showModal = () => {
    this.setState({
      modalVisible: true,
    });
  };

  handleOk = (e) => {
    console.log(e);
    this.setState({
      modalVisible: false,
    });
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      modalVisible: false,
    });
  };

  render() {
    const userCases = Object.keys(this.props.allCases);
    return (
      <div
        style={{ display: "flex", flexDirection: "column", background: "#FFF" }}
      >
        <Sider
          width={350}
          className="site-layout-background"
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Menu
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ borderRight: 0 }}
            mode="vertical"
          >
            <SubMenu
              key="chooseCaseSidebar"
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
                <Menu.Item onClick={this.showModal} key="createNewCase">
                  Create a new case
                </Menu.Item>
                <Modal
                  title="Basic Modal"
                  visible={this.state.modalVisible}
                  onOk={this.handleOk}
                  onCancel={this.handleCancel}
                >
                  <p>Some contents...</p>
                  <p>Some contents...</p>
                  <p>Some contents...</p>
                </Modal>
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
        </Sider>
        <CiteExport caseNameProp={this.state.caseRender} />
      </div>
    );
  }
}
const Sidebar = connect(mapStateToProps)(SidebarWrapper); // connect to Redux state
export default Sidebar; // this is the component that is used in App
