import React, { Component } from "react";
import PropTypes from "prop-types";
import { PageHeader, Button, Descriptions, Typography } from "antd";
import { StarOutlined, StarFilled } from "@ant-design/icons";
const { Paragraph } = Typography;

export default class BookmarkItem extends Component {
  state = {
    bookmarked: true // if the bookmark item is being rendered, that means it is a bookmark (hence, true by default)
  };

  setBookmark = tempBookmark => {
    this.props.addBookmark(tempBookmark);
  };

  delBookmark = id => {
    this.props.removeBookmark(id);
  };

  onChange = e => {
    this.setState({ bookmarked: !this.state.bookmarked });
    console.log("Paper now: ", this.state.bookmarked);
    if (this.state.bookmarked === true) {
      this.delBookmark(this.props.bookmark.ID);
      console.log("Removed paper");
    } else {
      this.setBookmark(this.props.bookmark);
      console.log("Bookmarked paper: ", this.props.bookmark.ID);
    }
  };

  render() {
    let abstractRender;

    if (this.props.bookmark.abstract) {
      abstractRender = (
        <Descriptions.Item
          span={6}
          bordered={true}
          label="Abstract"
          style={{ abstractStyle }}
        >
          {this.props.bookmark.abstract.replace(
            /(([^\s]+\s\s*){15})(.*)/,
            "$1…"
          )}
        </Descriptions.Item>
      );
    } else {
      abstractRender = (
        <Descriptions.Item
          span={6}
          bordered={true}
          label="Abstract"
          style={{ abstractStyle }}
        >
          Abstract not found. Visit the full paper for more details.
        </Descriptions.Item>
      );
    }

    let journalRender;

    if (this.props.bookmark.journal) {
      journalRender = (
        <Descriptions.Item label="Journal">
          {this.props.bookmark.journal}
        </Descriptions.Item>
      );
    } else {
      journalRender = (
        <Descriptions.Item label="Journal">
          Publication journal not found.
        </Descriptions.Item>
      );
    }

    let tempURL;
    if (this.props.bookmark == undefined) {
      tempURL = "";
    } else {
      tempURL = this.props.bookmark.url;
    }

    let tempAuthors;
    if (this.props.bookmark == undefined) {
      tempAuthors = [""];
    } else {
      tempAuthors = this.props.bookmark.authors;
    }
    return (
      <div className="BookmarkHeader" style={BookmarkStyle}>
        <PageHeader
          ghost={false}
          style={pageStyle}
          title={
            <React.Fragment>
              <a
                href={this.props.bookmark.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {this.props.bookmark.title}
              </a>
              {this.state.bookmarked ? (
                <Button type="link" onClick={this.onChange}>
                  <StarFilled />
                </Button>
              ) : (
                <Button type="link" onClick={this.onChange}>
                  <StarOutlined />
                </Button>
              )}
            </React.Fragment>
          }
          subTitle={tempAuthors
            .join(", ")
            .replace(/(([^\s]+\s\s*){2})(.*)/, "$1et al.")}
        >
          <Descriptions size="default">{abstractRender}</Descriptions>
          <Descriptions column={3}>{journalRender}</Descriptions>
        </PageHeader>
      </div>
    );
  }
}

BookmarkItem.propTypes = {
  bookmark: PropTypes.object.isRequired
};

const BookmarkStyle = {
  backgroundColor: "#f5f5f5",
  padding: "0.5% 5% 0.5% 2%"
};

const pageStyle = {
  boxShadow: "0 1px 1px 0 rgba(0, 0, 0, 0.1), 0 2px 3px 0 rgba(0, 0, 0, 0.1)"
};

const abstractStyle = {
  minWidth: "400px"
};