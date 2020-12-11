import React, { Component } from 'react';
import Navbar from "../containers/Global/Navbar";
import PageFooter from "../containers/Global/PageFooter";
// import { apiCall } from "../services/api";
// import { Link } from 'react-router-dom';
import Basic from '../containers/Profile/Basicinfo'
import Moreinfo from '../containers/Profile/Moreinfo'
import UserActivity from '../containers/Profile/UserActivity'

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    }
  }
  render() {
    return (
      <div id="profile">
        <Navbar currentUser={this.props.currentUser} />
        <section id="content" className="container">
          <Basic/>
          <div className="row">
            <Moreinfo/>
          <UserActivity/>
          </div>
        </section>
        <PageFooter />
        
      </div>
    )
  }
}
export default Profile;