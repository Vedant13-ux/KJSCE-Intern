import React, { Component } from "react";
import Navbar from "../containers/Global/Navbar";
import PageFooter from "../containers/Global/PageFooter";
import { apiCall } from "../services/api";
import Basic from "../containers/Profile/Basicinfo";
import Moreinfo from "../containers/Profile/Moreinfo";
import MoreInfoCouncil from '../containers/Profile/MoreInfoCouncil'
import UserActivity from "../containers/Profile/UserActivity";
import Loading from "../images/Loading";
import NotFound from "../images/NotFound"

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        skills: [],
        posts: [],
        applications: [],
      },
      owner: false,
      start: true,
      nof: false,
      profileId: this.props.match.params.id
    };
  }

  async componentDidMount() {
    console.log("profile Mounted")
    document.documentElement.scrollTop = 0;
    if (this.props.currentUser.user.email.split('@')[0] === this.state.profileId) {
      let i = 0;
      let temp = this.props.currentUser.user
      for (i = 0; i < temp.certificates.length; i++) {
        temp.certificates[i].date = new Date(temp.certificates[i].date)
      }
      await this.setState({ user: temp, owner: true, start: false });
    }
    else {
      apiCall("get", "/api/user/" + this.props.match.params.id, "")
        .then(async (data) => {
          console.log(data);
          let i = 0;
          for (i = 0; i < data.certificates.length; i++) {
            data.certificates[i].date = new Date(data.certificates[i].date)
          }
          await this.setState({
            user: data,
            start: false,
          });
        })
        .catch((err) => {
          console.log(err);
          this.setState({
            nof: true,
          });
        });
    }
  }
  render() {
    console.log(this.props.currentUser.user);
    if (this.state.start) {
      return (
        <div id="profile">
          <Navbar history={this.props.history} />
          <div
            style={{
              minHeight: "600px",
              display: "flex",
              alignItems: "center",
            }}
          >
            {this.state.nof ? <NotFound className="loading" /> : <Loading className="loading" />}
          </div>
          <PageFooter />
        </div>
      );
    } else {
      return (
        <div id="profile">
          <link
            href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
            rel="stylesheet"
          ></link>
          <Navbar history={this.props.history} />
          <section id="content" className="container">
            <Basic user={this.state.user} owner={this.state.owner} />
            <div className="row">
              {this.state.user.role === "Council" &&
                <MoreInfoCouncil owner={this.state.owner} user={this.state.user} />
              }
              {this.state.user.role !== "Council" &&
                <Moreinfo
                  isowner={this.state.owner}
                  user={this.state.user}
                />
              }
              <UserActivity owner={this.state.owner} user={this.props.currentUser.user} loggedin={this.props.currentUser.user} />
            </div>
          </section>
          <PageFooter />
        </div>
      );
    }
  }
}
export default Profile;
