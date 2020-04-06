import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Menu, Dropdown, Button, message, Tooltip } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Input } from "antd";

//LOGIC DOCUMENTATION:
// IF CASES, THEN POPULATE. ELSE, ONLY POPULATE WITH USER INPUT (HANDLE IN caseChoices LOGIC)
// UPON CLICK, ADD PAPER TO RESPECTIVE CASE (HANDLE IN handleMenuClick LOGIC)
// UPON CLICK ENTER, ADD PAPER TO NEW CASE IF USER INPUT (HANDLE IN handleMenuClick LOGIC)

function handleMenuClick(e) {
  message.info("Click on menu item.");
  console.log("click", e);
}

const caseChoices = (allCases) => (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="caseUserInput">
      <Input placeholder="Create new case" />
    </Menu.Item>
  </Menu>
);

export default function BookmarkSelector() {
  const allCases = useSelector((state) => state.bookmarksByCase);
  const numCases = Object.keys(allCases).length;
  console.log("Number of cases", numCases);

  return (
    <div>
      <Dropdown overlay={caseChoices(allCases)}>
        <Button>
          Select a study <DownOutlined />
        </Button>
      </Dropdown>
    </div>
  );
}
