import React, { Component } from "react";
import { Button } from "antd";
import { ExportOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import Cite from 'citation-js';
import { save } from 'save-file'

function ExportCitations(exports) {
  let citations = new Cite(exports)

  let output = citations.format('bibliography', {
    style: 'csl',
    template: "apa"
  })
  console.log("cite output", output)

  return(save(output, 'example.txt'))
}

function CiteExport() {


    return (
      <div>
        <Button icon={<ExportOutlined />} style={{marginLeft:"2.5%", width:"95%"}} onClick={exports => ExportCitations(["10.1186/s12885-019-5765-3","10.1038/s41586-020-1969-6"])}>Export Citations</Button>
      </div>
    );
  }


export default CiteExport;
