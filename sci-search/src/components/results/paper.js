import React, { Component } from 'react'
import PropTypes from "prop-types"
import { PageHeader, Button, Descriptions } from "antd";

export class Paper extends Component {
    render() {
        return (
            <div style={paperStyle}>
            <PageHeader
              ghost={false}
              onBack={() => window.history.back()}
              title="Title"
              subTitle="This is a subtitle"
              extra={[
                <Button key="3">Operation</Button>,
                <Button key="2">Operation</Button>,
                <Button key="1" type="primary">
                  Primary
                </Button>
              ]}
            >
              <Descriptions size="small" column={3}>
                <Descriptions.Item label="Created">Lili Qu</Descriptions.Item>
                <Descriptions.Item label="Association">
                  <a>421421</a>
                </Descriptions.Item>
                <Descriptions.Item label="Creation Time">
                  2017-01-10
                </Descriptions.Item>
                <Descriptions.Item label="Effective Time">
                  2017-10-10
                </Descriptions.Item>
                <Descriptions.Item label="Remarks">
                  Gonghu Road, Xihu District, Hangzhou, Zhejiang, China
                </Descriptions.Item>
              </Descriptions>
            </PageHeader>
          </div>
        )
    }
}

export default Paper

Paper.PropTypes = {
    results: PropTypes.array.isRequired
};

const paperStyle = {
  backgroundColor: "#f5f5f5",
  padding: "24px"
}