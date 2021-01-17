import React from "react";

export class MessagesPanel extends React.Component {
  constructor(props){
    super(props)
    this.state = { input_value: "" };
    
  }
  
  send = () => {
    if (this.state.input_value && this.state.input_value !== "") {
      this.props.onSendMessage(this.state.input_value);
      this.setState({ input_value: "" });
    }
  };

  handleInput = (e) => {
    this.setState({ input_value: e.target.value });
  };

  render() {
    let list = <div>no messages</div>;
    if (this.props.conversation && this.props.conversation.messages.length!==0) {
      list = this.props.conversation.messages.map((m) => {
        return <li class={m.author._id===this.props.myId?'message-right':'message-left'} hidden>
            <span class="message-text">m.text</span>
        </li>;
      });
    }
    return (
      <div className="messages-panel">
      <div className="chat-container">
        <div className="chat-listcontainer">
          <ul class="chat-message-list">{list}</ul>
        </div>
        {this.props.conversation && (
          <div className="messages-input">
            <input
              type="text"
              onChange={this.handleInput}
              value={this.state.input_value}
            />
            <button onClick={this.send}>Send</button>
          </div>
        )}
      </div></div>
    );
  }
}
