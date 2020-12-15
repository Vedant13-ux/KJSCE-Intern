import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import Navbar from "../containers/Global/Navbar";
import PageFooter from "../containers/Global/PageFooter";
// import { apiCall } from "../services/api";
// import Completed from '../containers/MyInternships/Completed'

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            completed: [],
            onGoing: []
        }
    }
    componentDidMount() {
        // apiCall('get','/')
    }
    render() {
        return (
            <div>
                <Navbar history={this.props.history} currentUser={this.props.currentUser} />
                <div id="myinternships" className="fluid-container">
                    <div className="completed">
                        <h1>⇒ Completed</h1>
                        { }
                    </div>
                </div>
                <PageFooter />
            </div>
        )
    }
}
export default Profile;