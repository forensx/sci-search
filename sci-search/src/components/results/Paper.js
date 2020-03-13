import React, { Component } from "react";
import PropTypes from "prop-types";
import { PageHeader, Button, Descriptions } from "antd";
import { StarOutlined, StarFilled } from "@ant-design/icons";

export class Paper extends Component {
  
  state = {
    bookmarked: false
  };

  journalCapitalizationCase = journalName => {
    var splitStr = journalName.toLowerCase().split(" ");
    for (var i = 0; i < splitStr.length; i++) {
      // You do not need to check if i is larger than splitStr length, as your for does that for you
      // Assign it back to the array
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join(" ");
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
      this.delBookmark(this.props.result.ID);
      console.log("Removed paper");
    } else {
      this.setBookmark(this.props.result);
      console.log("Bookmarked paper: ", this.props.result.ID);
    }
  };

  render() {
    let abstractRender;

    if (this.props.result.abstract) {
      abstractRender = (
        <Descriptions.Item
          span={6}
          bordered={true}
          label="Abstract"
          style={{ abstractStyle }}
        >
          {this.props.result.abstract.replace(
            /(([^\s]+\s\s*){150})(.*)/,
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

    if (this.props.result.journal) {
      journalRender = (
        <Descriptions.Item label="Journal">
          {this.journalCapitalizationCase(this.props.result.journal)}
        </Descriptions.Item>
      );
    } else {
      journalRender = (
        <Descriptions.Item label="Journal">
          Publication journal not found.
        </Descriptions.Item>
      );
    }

    let keywordRender;

    if (this.props.result.keywords) {
      keywordRender = (
        <Descriptions.Item label="Keywords">
          {this.props.result.keywords.join(", ")}
        </Descriptions.Item>
      );
    } else {
      keywordRender = (
        <Descriptions.Item label="Keywords">
          Keywords not found
        </Descriptions.Item>
      );
    }

    let geneListRender;

    if (this.props.result.genes) {
      geneListRender = (
        <Descriptions.Item label="Genes">
          {this.props.result.genes.map(gene => (
            <Button size="small" key={gene}>
              {gene}
            </Button>
          ))}
        </Descriptions.Item>
      );
    } else {
      geneListRender = (
        <Descriptions.Item label="Genes">Genes not found</Descriptions.Item>
      );
    }

    let dateRender;

    if (this.props.result.UTCDatetime === null) {
      console.log("UTC null");
      if (this.props.result.pubDate.year === null) {
        dateRender = (
          <Descriptions.Item label="Date">Date not available</Descriptions.Item>
        );
      } else if (this.props.result.pubDate.month === null) {
        dateRender = (
          <Descriptions.Item label="Date">Date not available</Descriptions.Item>
        );
      } else if (this.props.result.pubDate.day === null) {
        dateRender = (
          <Descriptions.Item label="Date">Date not available</Descriptions.Item>
        );
      }
    } else {
      console.log(
        "Date is: ",
        this.props.result.pubDate.day,
        this.props.result.pubDate.month,
        this.props.result.pubDate.year
      );
      const date = new Date(this.props.result.UTCDatetime);
      console.log(date);

      dateRender = (
        <Descriptions.Item label="Date">
          {date.toLocaleDateString()}
        </Descriptions.Item>
      );
    }

    return (
      <div className="PaperHeader" style={paperStyle}>
        <PageHeader
          ghost={false}
          style={pageStyle}
          title={
            <React.Fragment>
              <a
                href={this.props.result.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {this.props.result.title}
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
          subTitle={this.props.result.authors
            .join(", ")
            .replace(/(([^\s]+\s\s*){11})(.*)/, "$1et al.")}
          extra={[
            <Button key="go_paper_button" type="primary">
              <a
                href={this.props.result.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Full Paper
              </a>
            </Button>
          ]}
        >
          <Descriptions size="default">{abstractRender}</Descriptions>
          <Descriptions column={3}>
            {dateRender}
            <Descriptions.Item label="Database">
              {this.props.result.database}
            </Descriptions.Item>
            {journalRender}
          </Descriptions>
          <Descriptions column={2}>
            <i>{keywordRender}</i>
          </Descriptions>
          <Descriptions column={2}>{geneListRender}</Descriptions>
          <Descriptions column={1}>
            <Descriptions.Item label="Paper Priority Index">
              <b>{this.props.result.ppindex}</b>
            </Descriptions.Item>
          </Descriptions>
        </PageHeader>
      </div>
    );
  }
}

export default Paper;

Paper.propTypes = {
  result: PropTypes.object.isRequired
};

const paperStyle = {
  backgroundColor: "#f5f5f5",
  padding: "0.5% 5% 0.5% 2%"
};

const pageStyle = {
  boxShadow: "0 1px 1px 0 rgba(0, 0, 0, 0.1), 0 2px 3px 0 rgba(0, 0, 0, 0.1)"
};

const abstractStyle = {
  minWidth: "400px"
};
