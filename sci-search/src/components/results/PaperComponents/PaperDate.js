const PaperDate = (props) => {
  console.log("Pub Date returned: ", props.pubDate);
  const date = new Date(props.pubDate);
  return date.toLocaleDateString();
};

export default PaperDate;
