import React, { Component } from "react";
import Navbar from "../containers/Global/Navbar";
import PageFooter from "../containers/Global/PageFooter";
import { apiCall } from "../services/api";
import Basic from "../containers/Profile/Basicinfo";
import Moreinfo from "../containers/Profile/Moreinfo";
import UserActivity from "../containers/Profile/UserActivity";
import Loading from "../images/Loading";
import NotFound from "../images/NotFound"
import { connect } from 'react-redux'
import { updateSkills, updateCertificates } from '../store/actions/user'

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
      profileId: this.props.match.params.id
    };
    this.changeskill = this.changeskill.bind(this);
    this.addcert = this.addcert.bind(this);
  }

  async componentDidMount() {
    document.documentElement.scrollTop = 0;
    // console.log(this.props.match.params.id);
    if (this.props.currentUser.user.email.split('@')[0] === this.state.profileId) {
      let i = 0;
      let temp = this.props.currentUser.user
      for (i = 0; i < temp.skills.length; i++) {
        this.state.preskills.push({
          text: temp.skills[i],
        });
      }
      // for (i = 0; i < temp.posts.length; i++) {
      //   temp.posts[i]["author"]=this.props.currentUser.user // temporary fix
      // }
      for (i = 0; i < temp.certificates.length; i++) {
        temp.certificates[i].date = new Date(temp.certificates[i].date)
      }
      await this.setState({ user: temp, preskills: this.state.preskills, owner: true, start: false });
    }
    else {
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
    }
  }
  addcert(cert) {
    let temp = this.state.user;
    cert.date = new Date(cert.date);
    console.log(temp.certificates[0].date);
    this.props.updateCertificates(cert, this.state.user._id).then(
      () => console.log('Certificate Added')
    ).catch((err) => err)

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
    this.props.updateSkills(s, this.state.user._id).then(
      () => console.log('Skills Added')
    ).catch((err) => err)
  }
  render() {
    if (this.state.start) {
      return (
        <div id="profile">
          <Navbar currentUser={this.props.currentUser} history={this.props.history} />
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
          <Navbar currentUser={this.props.currentUser} history={this.props.history} />
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
              <UserActivity owner={this.state.owner} user={this.state.user} />
            </div>
          </section>
          <PageFooter />
        </div>
      );
    }
  }
}
function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}
export default connect(mapStateToProps, { updateSkills, updateCertificates })(Profile);
