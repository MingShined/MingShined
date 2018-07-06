import { Card } from "antd";
import { connect } from "dva";
import React, { Component } from "react";
import Comment from "./Comment";

@connect(({ localStorage }) => ({ ...localStorage }))
export default class componentName extends Component {
  handleDeleteComment(index) {
    this.props.dispatch({
      type: "localStorage/deleteComemnt",
      payload: index
    });
  }
  render() {
    const messageList = this.props.messageList;
    return (
      <div>
        <Card title="说说列表">
          {messageList.map((item, index) => {
            return (
              <Comment
                key={index}
                messageList={item}
                index={index}
                handleDeleteComment={this.handleDeleteComment.bind(this)}
              />
            );
          })}
        </Card>
      </div>
    );
  }
}
