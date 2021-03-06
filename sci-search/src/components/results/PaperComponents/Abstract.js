import React from "react";

const Abstract = (props) => {
  return props.abstract ? (
    props.abstract.replace(/(([^\s]+\s\s*){150})(.*)/, "$1…")
  ) : (
    <div>Abstract not found. Visit the full paper for more details.</div>
  );
};

export default Abstract;
