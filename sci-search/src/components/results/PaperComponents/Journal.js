import React from "react";
import { Descriptions } from "antd";

function journalCapitalizationCase(journalName) {
    var splitStr = journalName.toLowerCase().split(" ");
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join(" ");
  }

const Journal = (props) => {
  return props.journal ? (
      journalCapitalizationCase(props.journal)
  ) : (
      <div>Publication journal not found.</div>
  );
};


export default Journal;
