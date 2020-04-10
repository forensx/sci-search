import React from "react";
import { Button, message } from "antd";
import { ExportOutlined } from "@ant-design/icons";
import Cite from "citation-js";
import { save } from "save-file";
import { useSelector } from "react-redux";

function ExportCitations(caseNameProp, allCases) {
  if (caseNameProp) {
    let curCase = caseNameProp;
    let myCase = allCases[curCase].bookmarks;
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
    message.error("No case selected! Select a case first.");
  }
}

function CiteExport(props) {
  console.log(props.caseNameProp);
  const allCases = useSelector((state) => state.bookmarksByCase);
  return (
    <div style={{ position: "absolute", bottom: "0"}}>
      <Button
        icon={<ExportOutlined />}
        style={{ marginLeft: "15px", width: "320px", marignBottom: "30%" }}
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
