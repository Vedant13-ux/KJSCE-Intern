import React from 'react';
import ConversationList from './ConversationList';
import './chat.css';
import { MessagesPanel } from './MessagesPanel';
import socketClient from "socket.io-client";
import {apiCall} from '../../services/api'
const SERVER = "http://localhost:3001";

export default class Chat extends React.Component {
    constructor(props){
        super(props)
        this.state= {
            conversations: [],
            socket: null,
            conversation: null
        }
    }
    componentDidMount() {
        this.loadConversations();
        this.configureSocket();
    }

    configureSocket = () => {
        var socket = socketClient(SERVER);
        socket.on('connection', () => {
            console.log("connected to server")
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
        this.socket = socket;
    }

    loadConversations = async () => {
        apiCall("put", "/api/getConversations/",{list:this.props.currentUser.user.conversations})
            .then((data) => {
                console.log(data);
                this.setState({ conversations: data.list });
            })
            .catch((err) => console.log(err));
    }

    handleChannelSelect = id => {
        // let channel = this.state.channels.find(c => {
        //     return c.id === id;
        // });
        // this.setState({ channel });
        // this.socket.emit('channel-join', id, ack => {
        // });
    }

    handleSendMessage = (channel_id, text) => {
        // this.socket.emit('send-message', { channel_id, text, senderName: this.socket.id, id: Date.now() });
    }

    render() {

        return (
            <div id='wrapper'>
                <ConversationList conversations={this.state.conversations} onSelectChannel={this.handleChannelSelect} />
                <MessagesPanel onSendMessage={this.handleSendMessage} channel={this.state.channel} />
            </div>
        );
    }
}