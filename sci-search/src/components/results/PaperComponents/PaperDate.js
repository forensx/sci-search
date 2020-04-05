function processDate(UTCDatetime, pubDate) {
  if (UTCDatetime === null) {
    if (pubDate.year === null) {
      return "Date not available";
    } else if (pubDate.month === null) {
      return "Date not available";
    } else if (pubDate.day === null) {
      return "Date not available";
    }
  } else {
    const date = new Date(UTCDatetime);
    return date.toLocaleDateString();
  }
}

const PaperDate = (props) => {
  console.log("UTC Date returned: ", props.UTCDatetime);
  console.log("Pub Date returned: ", props.pubDate);
  console.log(
    "Processed date: ",
    processDate(props.UTCDatetime, props.pubDate)
  );
  return processDate(props.UTCDatetime, props.pubDate);
};

export default PaperDate;
