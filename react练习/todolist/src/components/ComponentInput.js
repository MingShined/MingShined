import React, { Component } from "react";
import { connect } from "dva";
import { Input, Button, Divider, notification } from "antd";
const { TextArea } = Input;

@connect(({ localStorage }) => ({ ...localStorage }))
export default class ComponentInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: this.props.userName,
      comment: ""
    };
  }
  handleNameChange(e) {
    let userName = e.target.value;
    this.setState({
      userName
    });
  }
  handleCommentChange(e) {
    let comment = e.target.value;
    this.setState({
      comment
    });
  }
  handlePublic() {
    if (!this.state.userName) {
      this.handleNoticeMsg("友情提示", "请输入姓名");
      return false;
    } else if (!this.state.comment) {
      this.handleNoticeMsg("友情提示", "请输入评论");
      return false;
    }
    this.props.dispatch({
      type: "localStorage/getUserInfo",
      payload: {
        userName: this.state.userName,
        comment: this.state.comment,
        publicTime: +Date.now()
      }
    });
    this.setState({
      comment: ""
    });
    const commentInput = document.getElementById("comment");
    commentInput.focus();
    notification.open({ message: "^_^", description: "发表成功" });
  }
  handleNoticeMsg(title, msg) {
    notification.open({
      message: title,
      description: msg
    });
  }
  render() {
    return (
      <div>
        <Divider />
        <Input
          placeholder="请输入姓名"
          onChange={this.handleNameChange.bind(this)}
          defaultValue={this.state.userName}
        />
        <Divider />
        <TextArea
          placeholder="请输入说说"
          autosize={{ minRows: 8, maxRows: 15 }}
          onChange={this.handleCommentChange.bind(this)}
          value={this.state.comment}
          id="comment"
        />
        <Button
          type="primary"
          size="large"
          style={{ marginTop: "20px" }}
          onClick={this.handlePublic.bind(this)}
        >
          发表
        </Button>
      </div>
    );
  }
}
