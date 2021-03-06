import React from "react";
import { Button } from "antd";

const Genes = (props) => {
  return props.genes.map((gene) => (
    <Button size="small" key={gene}>
      {gene}
    </Button>
  ));
};

export default Genes;
