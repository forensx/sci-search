import React, { Component } from "react";
import PropTypes from "prop-types";
import { PageHeader, Button, Descriptions, Typography } from "antd";
import { Row, Col } from "antd";
const { Paragraph } = Typography;

export class Bookmark extends Component {
  render() {
    let abstractRender;
    if (this.props.results.abstract) {
      abstractRender = (
        <Descriptions.Item
          span={6}
          bordered={true}
          label="Abstract"
          style={{ abstractStyle }}
        >
          {this.props.results.abstract.replace(
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

    if (this.props.results.journal) {
      journalRender = (
        <Descriptions.Item label="Journal">
          {this.props.results.journal}
        </Descriptions.Item>
      );
    } else {
      journalRender = (
        <Descriptions.Item label="Journal">
          Publication journal not found.
        </Descriptions.Item>
      );
    }

    return (
      <div className="BookmarkHeader" style={BookmarkStyle}>
        <PageHeader
          ghost={false}
          style={pageStyle}
          title={
            <a
              href={this.props.results.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {this.props.results.title.replace(
                /(([^\s]+\s\s*){5})(.*)/,
                "$1..."
              )}
            </a>
          }
          subTitle={this.props.results.authors
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

export default Bookmark;

Bookmark.propTypes = {
  results: PropTypes.object.isRequired
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
