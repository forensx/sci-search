import React, { Component } from "react";
import { Button } from "antd";
import { ExportOutlined } from "@ant-design/icons";

export class CiteExport extends Component {
  render() {
    return (
      <div>
        <Button icon={<ExportOutlined />} style={{marginLeft:"2.5%", width:"95%"}}>Export Citations</Button>
      </div>
    );
  }
}

export default CiteExport;
