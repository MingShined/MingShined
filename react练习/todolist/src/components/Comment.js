import React, { Component } from "react";
import { Card, notification } from "antd";

export default class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      publicTime: null,
      timer: null
    };
  }
  componentDidMount = () => {
    this.getPublicTime();
    this.timer = setInterval(this.getPublicTime.bind(this), 5000);
  };
  componentWillUnmount() {
    clearInterval(this.timer);
    notification.open({ message: "^_^", description: "删除成功" });
  }
  getPublicTime() {
    const { messageList } = this.props,
      publicTime = (+Date.now() - messageList.publicTime) / 1000;
    this.setState({
      publicTime:
        publicTime < 60
          ? `${Math.round(Math.max(publicTime, 1))}秒前`
          : `${Math.round(publicTime / 60)}分前`
    });
  }
  handleDeleteComment(index) {
    this.props.handleDeleteComment(index);
  }
  render() {
    const gridStyle = { width: "100%", textAlign: "left" },
      { messageList, index } = this.props;
    return (
      <div>
        <Card.Grid style={gridStyle}>
          @{messageList.userName}： {messageList.comment}
          <span style={{ float: "right" }}>{this.state.publicTime}</span>
          <div>
            <a onClick={this.handleDeleteComment.bind(this, index)}>删除</a>
          </div>
        </Card.Grid>
      </div>
    );
  }
}
