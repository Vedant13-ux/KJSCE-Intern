import React, { Component } from 'react';
import Navbar from "../containers/Global/Navbar";
import PageFooter from "../containers/Global/PageFooter";
import { apiCall } from "../services/api";
import Basic from '../containers/Profile/Basicinfo'
import Moreinfo from '../containers/Profile/Moreinfo'
import UserActivity from '../containers/Profile/UserActivity'

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        skills: [],
        posts: [],
        applications: []
      },
      owner: false,
      start: true
    }
  }
  async componentDidMount() {
    console.log(this.props.match.params.id);
    if (this.props.currentUser.user.email.split('@')[0] === this.props.match.params.id) {
      await this.setState({ user: this.props.currentUser.user, owner: true });
    }
    else {
      console.log(this.props.match.params.id);
      apiCall('get', '/api/user/' + this.props.match.params.id, '').then(
        async (data) => {
          console.log(data);
          await this.setState({ user: data });
        }
      )
        .catch(err => console.log(err));
    }
  }
  render() {
    return (
      <div id="profile">
        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet"></link>
        <Navbar currentUser={this.props.currentUser} />
        <section id="content" className="container">
          <Basic user={this.state.user} owner={this.state.owner} />
          <div className="row">
            <Moreinfo user={this.state.user} owner={this.state.owner} />
            <UserActivity user={this.state.user} owner={this.state.owner} />
          </div>
        </section>
        <PageFooter />

      </div>
    )
  }
}
export default Profile;