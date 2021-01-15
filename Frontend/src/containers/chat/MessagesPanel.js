import React from "react";

export class MessagesPanel extends React.Component {
  state = { input_value: "" };
  send = () => {
    if (this.state.input_value && this.state.input_value !== "") {
      this.props.onSendMessage(this.props.channel.id, this.state.input_value);
      this.setState({ input_value: "" });
    }
  };

  handleInput = (e) => {
    this.setState({ input_value: e.target.value });
  };

  render() {
    let list = (
      <div></div>
    );
    if (this.props.channel && this.props.channel.messages) {
      list = this.props.channel.messages.map((m) => {
        <div className="message-item">
          <div>
            <b>{m.senderName}</b>
          </div>
          <span>{m.text}</span>
        </div>;
      });
    }
    return (
      <div className="chat-container">
        <div className="chat-listcontainer">
          <ul class="chat-message-list">{list}</ul>
        </div>
        {this.props.channel && (
          <div className="messages-input">
            <input
              type="text"
              onChange={this.handleInput}
              value={this.state.input_value}
            />
            <button onClick={this.send}>Send</button>
          </div>
        )}
      </div>
    );
  }
}
