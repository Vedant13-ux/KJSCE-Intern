import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from "../containers/Global/Navbar";
import PageFooter from "../containers/Global/PageFooter";
import { apiCall } from "../services/api";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        }
    }
    render() {
        return (
            <div>
                <Navbar />
                <div id="userProfile" style={{minHeight:"800px"}}>
                    <h1>Hello world</h1>
                </div>
                <PageFooter />
            </div>
        )
    }
}
export default Profile;