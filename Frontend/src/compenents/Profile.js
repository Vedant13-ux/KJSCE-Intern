import React, { Component } from "react";
import Navbar from "../containers/Global/Navbar";
import PageFooter from "../containers/Global/PageFooter";
import { apiCall } from "../services/api";
import Basic from "../containers/Profile/Basicinfo";
import Moreinfo from "../containers/Profile/Moreinfo";
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
      preskills: [],
    };
    this.changeskill = this.changeskill.bind(this);
    this.addcert = this.addcert.bind(this);
  }
  async componentDidMount() {
    document.documentElement.scrollTop = 0;
    // console.log(this.props.match.params.id);
    // if (this.props.currentUser.user.email.split('@')[0] === this.props.match.params.id) {
    //   await this.setState({ user: this.props.currentUser.user, owner: true, start: false });
    // }
    // else {
    // console.log(this.props.match.params.id);
    apiCall("get", "/api/user/" + this.props.match.params.id, "")
      .then(async (data) => {
        console.log(data);
        let i = 0;
        for (i = 0; i < data.skills.length; i++) {
          this.state.preskills.push({
            text: data.skills[i],
          });
        }
        for (i = 0; i < data.certificates.length; i++) {
          data.certificates[i].date = new Date(data.certificates[i].date)
        }
        await this.setState({
          owner:true,
          user: data,
          preskills: this.state.preskills,
          start: false,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          nof: true,
        });
      });
    // }
  }
  addcert(o) {
    let temp = this.state.user;
    temp.certificates.push(o);

    apiCall('put', '/api/profile/update/certificates', { certificate: o, id: this.props.currentUser.user._id }).then(
      (d) => console.log(d)
    ).catch((e) => console.log(e))
    return this.setState({ user: temp })
  }
  changeskill(s) {
    let temp = this.state.user;
    temp["skills"] = s;
    let i = 0;
    let t = []
    for (i = 0; i < s.length; i++) {
      t.push({
        text: s[i],
      });
    }
    apiCall('put', '/api/profile/update/skills', { skills: s, id: this.props.currentUser.user._id }).then(
      (d) => console.log(d)
    ).catch((e) => console.log(e))
    return this.setState({ user: temp, preskills: t });
  }
  render() {
    if (this.state.start) {
      return (
        <div id="profile">
          <Navbar currentUser={this.props.currentUser} />
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
          <Navbar currentUser={this.props.currentUser} />
          <section id="content" className="container">
            <Basic user={this.state.user} owner={this.state.owner} />
            <div className="row">
              <Moreinfo
                addcert={this.addcert}
                isowner={this.state.owner}
                preskills={this.state.preskills}
                changeskill={this.changeskill}
                user={this.state.user}
                owner={this.state.owner}
              />
              <UserActivity user={this.state.user} owner={this.state.owner} />
            </div>
          </section>
          <PageFooter />
        </div>
      );
    }
  }
}
export default Profile;
