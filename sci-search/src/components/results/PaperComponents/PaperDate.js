const PaperDate = (props) => {
  const date = new Date(props.pubDate);
  return date.toLocaleDateString();
};

export default PaperDate;
