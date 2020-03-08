import React, { Component } from "react";
import PropTypes from "prop-types";
import { PageHeader, Button, Descriptions, Typography } from "antd";
import { Row, Col } from 'antd';
const { Paragraph } = Typography;

export class Paper extends Component {
  render() {
    return (
      <div className="PaperHeader" style={paperStyle}>
        <PageHeader
          ghost={false}
          title={
            <a
              href={this.props.results.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {this.props.results.title}
            </a>
          }
          subTitle={this.props.results.authors.join(", ").replace(/(([^\s]+\s\s*){11})(.*)/,"$1et al.")}
          extra={[
            <Button key="go_paper_button" type="primary">
              <a
                href={this.props.results.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Full Paper
              </a>
            </Button>
          ]}
        >
          <Descriptions size="default">
            <Descriptions.Item span={6} bordered={true} label="Abstract" style={{ abstractStyle }}>
              {this.props.results.abstract.replace(/(([^\s]+\s\s*){150})(.*)/,"$1…")}
            </Descriptions.Item>
            <br></br>
            <br></br>
            <Descriptions.Item label="Keywords">
              {this.props.results.keywords}
            </Descriptions.Item>
            <br></br>
            <Descriptions.Item label="Date">
              {this.props.results.pubDate.month}-
              {this.props.results.pubDate.day}-
              {this.props.results.pubDate.year}
            </Descriptions.Item>
            <Descriptions.Item label="Database">
            {this.props.results.database}
            </Descriptions.Item>
            <Descriptions.Item label="Journal">
            {this.props.results.journal}
            </Descriptions.Item>
          </Descriptions>
        </PageHeader>
      </div>
    );
  }
}

export default Paper;

Paper.propTypes = {
  results: PropTypes.object.isRequired
};

const paperStyle = {
  backgroundColor: "#f5f5f5",
  padding: "0.5% 5% 0.5% 2%"
};

const abstractStyle = {
  minWidth: "400px"
};
