import React from "react";
import { Descriptions } from "antd";

const Keywords = (props) => {
  return (
      props.keywords.join(", ")
  )
};

export default Keywords;
