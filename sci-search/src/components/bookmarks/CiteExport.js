import React, { Component } from "react";
import { Button } from "antd";
import { ExportOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import Cite from "citation-js";
import { save } from "save-file";
import { useSelector } from "react-redux";

function ExportCitations(caseNameProp, allCases) {
  if (caseNameProp) {
    let curCase = caseNameProp; //Change this to be current case id
    let myCase = allCases[curCase].bookmarks; //Change this to filter by id instead of case name
    let DOIs = [];
    myCase.forEach((x) => DOIs.push(x.doi));
    console.log("all cases are", allCases);
    console.log("all DOIs are", DOIs);
    let citations = new Cite(DOIs);
    let output = citations.format("bibliography", {
      style: "csl",
      template: "apa",
    });
    console.log("cite output", output);

    return save(output, "example.txt");
  } else {
    console.log("No cases yet");
  }
}

function CiteExport(props) {
  console.log(props.caseNameProp);
  const allCases = useSelector((state) => state.bookmarksByCase);
  return (
    <div>
      <Button
        icon={<ExportOutlined />}
        style={{ marginLeft: "2.5%", width: "95%" }}
        onClick={(exports) => ExportCitations(props.caseNameProp, allCases)}
      >
        Export Citations
      </Button>
    </div>
  );
}

// function Welcome(props) {
//   return <h1>Hello, {props.name}</h1>;
// }

export default CiteExport;
