import React, { Component } from "react";
import { connect } from "react-redux";
import { addBookmark } from "../../../js/actions";
import { Menu, Dropdown, Button, message } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Input } from "antd";

const mapStateToProps = (state, ownProps) => ({
  allCases: state.bookmarksByCase,
  paper: ownProps.paper,
}); // connect props to state store in Redux

class BookmarkSelectorWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleVisibleChange = this.handleVisibleChange.bind(this);
    this.handleNewUserCase = this.handleNewUserCase.bind(this);
  }

  handleMenuClick = (e) => {
    const { dispatch, paper } = this.props;
    if (e.key === "caseUserInput") {
      this.setState({ visible: true });
    } else {
      // second parameter is second delay for popup message
      message.success("Paper bookmarked to " + e.key + "!", 1);
      dispatch(addBookmark(paper, e.key));
      this.setState({ visible: false });
    }
  };

  handleVisibleChange = (flag) => {
    this.setState({ visible: flag });
  };

  handleNewUserCase = (e) => {
    const { dispatch, paper } = this.props;
    if (e.key === "Enter") {
      message.success("Paper bookmarked to " + e.target.value + "!", 1);
      dispatch(addBookmark(paper, e.target.value));
    }
  };

  render() {
    const caseChoices = (allCases) => (
      <Menu
        onClick={this.handleMenuClick} // pass paper
      >
        {allCases
          ? allCases.map((result) => (
              <Menu.Item key={result}>{result}</Menu.Item>
            ))
          : null}
        <Menu.Item key="caseUserInput">
          <Input
            placeholder="Create new case"
            onKeyDown={this.handleNewUserCase} // pass paper
            id="userNewCaseInput"
          />
        </Menu.Item>
      </Menu>
    );
    return (
      <div>
        <Dropdown
          onVisibleChange={this.handleVisibleChange}
          visible={this.state.visible}
          overlay={caseChoices(Object.keys(this.props.allCases))}
        >
          <Button>
            Select a study <DownOutlined />
          </Button>
        </Dropdown>
      </div>
    );
  }
}

const BookmarkSelector = connect(mapStateToProps)(BookmarkSelectorWrapper); // connect to Redux state
export default BookmarkSelector; // this is the component that is used in App
