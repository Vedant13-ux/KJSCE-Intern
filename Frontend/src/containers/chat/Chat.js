import React from "react";
import ConversationList from "./ConversationList";
import "./chat.css";
import Navbar from "../Global/Navbar";
import PageFooter from "../Global/PageFooter";
import { MessagesPanel } from "./MessagesPanel";
import socketClient from "socket.io-client";
import { apiCall } from "../../services/api";
const SERVER = "http://localhost:3001";

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      conversations: [],
      socket: null,
      conversation: null,
    };
    this.configureSocket = async () => {
      var socket = socketClient(SERVER);
      console.log("started socket");
      await socket.on("connection", () => {
        console.log("connected to server");
      });
      // socket.on('channel', channel => {

      //     let channels = this.state.channels;
      //     channels.forEach(c => {
      //         if (c.id === channel.id) {
      //             c.participants = channel.participants;
      //         }
      //     });
      //     this.setState({ channels });
      // });
      // socket.on('message', message => {

      //     let channels = this.state.channels
      //     channels.forEach(c => {
      //         if (c.id === message.channel_id) {
      //             if (!c.messages) {
      //                 c.messages = [message];
      //             } else {
      //                 c.messages.push(message);
      //             }
      //         }
      //     });
      //     this.setState({ channels });
      // });
      // this.socket = socket;
    };

    this.loadConversations = async () => {
      apiCall("put", "/api/getConversations/", {
        list: this.props.currentUser.user.conversations,
      })
        .then((data) => {
          this.setState({ conversations: data.list });
        })
        .catch((err) => console.log(err));
    };

    this.handleChannelSelect = (id) => {
      let conversation = this.state.conversations.find(c => {
        return c._id === id;
      });
      // this.socket.emit('channel-join', id, ack => {
      // });
      this.setState({ conversation });

    };

    this.handleSendMessage = (text) => {
      this.socket.emit("send-message", {
        convoId: this.state.conversation._id,
        message: { text, author: this.props.currentUser.user },
      });
    };

  }
  async componentDidMount() {
    console.log('Hello World');
    await this.loadConversations();
    await this.configureSocket();
  }


  render() {
    return (
      <div>
        <Navbar history={this.props.history} onPage="messaging" />
        <div id="wrapper">
          <ConversationList
            conversations={this.state.conversations}
            onSelectChannel={this.handleChannelSelect}
            myId={this.props.currentUser.user._id}
          />
          <MessagesPanel
            onSendMessage={this.handleSendMessage}
            conversation={this.state.conversation}
            myId={this.props.currentUser.user._id}
          />
        </div>
        <PageFooter />
      </div>
    );
  }
}
