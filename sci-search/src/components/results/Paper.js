import React, { useState } from "react";
import PropTypes from "prop-types";
import { PageHeader, Button, Descriptions } from "antd";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import Abstract from "./PaperComponents/Abstract";
import Journal from "./PaperComponents/Journal";
import Keywords from "./PaperComponents/Keywords";
import Genes from "./PaperComponents/Genes";
import PaperDate from "./PaperComponents/PaperDate";
import PPIndex from "./PaperComponents/PPIndex";

function onBookmark(paperID) {
  console.log("PAPER BOOKMARK ID: ", paperID);
}

export default function Paper(props) {
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <div className="PaperHeader" style={paperStyle}>
      <PageHeader
        ghost={false}
        style={pageStyle}
        title={
          <React.Fragment>
            <a
              href={props.result.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {props.result.title}
            </a>
            {bookmarked ? (
              <Button
                type="link"
                onClick={(onBookmark(props.result.ID), setBookmarked)}
              >
                <StarFilled />
              </Button>
            ) : (
              <Button
                type="link"
                onClick={(onBookmark(props.result.ID), setBookmarked)}
              >
                <StarOutlined />
              </Button>
            )}
          </React.Fragment>
        }
        subTitle={props.result.authors
          .join(", ")
          .replace(/(([^\s]+\s\s*){11})(.*)/, "$1et al.")}
        extra={[
          <Button key="go_paper_button" type="primary">
            <a
              href={props.result.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Full Paper
            </a>
          </Button>,
        ]}
      >
        <Descriptions size="default">
          <Descriptions.Item
            span={6}
            bordered={true}
            label="Abstract"
            style={{ abstractStyle }}
          >
            <Abstract abstract={props.result.abstract} />
          </Descriptions.Item>
        </Descriptions>
        <Descriptions column={3}>
          <Descriptions.Item label="Publication Date">
            <PaperDate
              UTCDatetime={props.result.UTCDatetime}
              pubDate={props.result.pubDate}
            />
          </Descriptions.Item>
          <Descriptions.Item label="Database">
            {props.result.database}
          </Descriptions.Item>
          <Descriptions.Item label="Journal">
            <Journal journal={props.result.journal} />
          </Descriptions.Item>
        </Descriptions>
        <Descriptions column={2}>
          <Descriptions.Item label="Keywords">
            <Keywords keywords={props.result.keywords} />
          </Descriptions.Item>
        </Descriptions>
        <Descriptions column={2}>
          <Descriptions.Item label="Genes">
            <Genes genes={props.result.genes} />
          </Descriptions.Item>
        </Descriptions>
        <Descriptions column={1}>
          <Descriptions.Item label="Paper Priority Index">
            <PPIndex ppindex={props.result.ppindex.toFixed(3)} />
          </Descriptions.Item>
        </Descriptions>
      </PageHeader>
    </div>
  );
}

Paper.propTypes = {
  result: PropTypes.object.isRequired,
};

const abstractStyle = {
  minWidth: "400px",
};

const paperStyle = {
  backgroundColor: "#f5f5f5",
  padding: "0.5% 5% 0.5% 2%",
};

const pageStyle = {
  boxShadow: "0 1px 1px 0 rgba(0, 0, 0, 0.1), 0 2px 3px 0 rgba(0, 0, 0, 0.1)",
};
