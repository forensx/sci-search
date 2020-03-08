import React, { Component } from "react";
import PropTypes from "prop-types";
import { PageHeader, Button, Descriptions, Row, Col } from "antd";

export class Paper extends Component {
  render() {
    return (
      <div style={paperStyle}>
        <PageHeader
          ghost={false}
          title={this.props.results.title}
          subTitle={this.props.results.authors}
          extra={[
            <Button key="1" type="primary">
              Primary
            </Button>
          ]}
        >
          <Descriptions size="small" column={3}>

                <Descriptions.Item label="Abstract">
                  {this.props.results.abstract}
                </Descriptions.Item>
                <br></br>
                <br></br>
                <Descriptions.Item label="Keywords">
                  {this.props.results.keywords}
                </Descriptions.Item>
                <br></br>
                <Descriptions.Item label="Date">
                  {this.props.results.date}
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
  padding: "0.5% 5% 0.5% 3%"
};

const abstractStyle = {
  
};
