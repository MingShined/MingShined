import React, { Component } from "react";
import ComponentInput from "../components/ComponentInput";
import CommentList from "../components/CommentList";
import Style from "./indexPage.css";
import { Divider } from "antd";

class IndexPage extends Component {
  render() {
    return (
      <div className={Style.container}>
        <ComponentInput />
        <Divider />
        <CommentList />
      </div>
    );
  }
}

export default IndexPage;
