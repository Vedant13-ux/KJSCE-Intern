import React, { Component } from "react";
import { Nav } from "react-bootstrap";
// import { Link } from 'react-router-dom';
import { PostWall } from "../../compenents/Community";
// import { apiCall } from "../../services/api";
import Experience from "./Experience";
import Project from "./Project";
import Event from "./Event";
import Achievement from "./Achievement";
import { Link } from 'react-router-dom'
import InternshipOffered from './InternshipOffered'
import NoApplication from '../../images/NoApplication';
import Activity from './Activity';
import { connect } from 'react-redux'
import { addPost } from '../../store/actions/user'


class Basic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ["Faculty", "Student", "Alumni"].includes(this.props.user.role) ? "experiences" : "events",
      posts: this.props.user.posts,
      start: false,
    };
    this.handleSwitch = this.handleSwitch.bind(this);
  }
  componentWillMount() {
    let content = window.location.href.split("#")[1];
    if (content === undefined) return;
    return this.setState({ content: content });
  }

  handleSwitch(e) {
    return this.setState({ content: e.target.name });
  }
  render() {
    let display;
    switch (this.state.content) {
      case "events":
        display = <Event owner={this.props.owner} user={this.props.user} />;
        break;
      case "experiences":
        display = (
          <Experience owner={this.props.owner} user={this.props.user} />
        );
        break;
      case "projects":
        display = <Project owner={this.props.owner} user={this.props.user} />;
        break;
      case "application":
        display = (
          <div id="experience">
            {this.props.user.applications.map((e, i) => {
              return (
                <div className="experience-ele">
                  <h4>{e.title}</h4>
                  <sub>{e.category}</sub>
                  <span className="deleteproj">{e.recruited.includes(this.props.user._id) ? (<span class="badge badge-success">Selected</span>) : (<span class="badge badge-secondary">Applied</span>)}</span>
                  <p>
                    <span>{'Duration : ' + e.duration + ' months'}</span><br></br>
                    <h6>{e.description}</h6>
                    <Link to={"/internship/" + e._id}>
                      see internship
          </Link>
                  </p>
                </div>
              );
            })}
            {this.props.user.applications.length === 0 && <NoApplication></NoApplication>}
          </div>
        );
        break;
      case "internshipoffered":
        display = (<InternshipOffered owner={this.props.owner}
          user={this.props.user}></InternshipOffered>)
        break;
      case "achievement":
        display = (
          <Achievement
            owner={this.props.owner}
            user={this.props.user}
          ></Achievement>
        );
        break;
      case "posts":
        display = (
          <PostWall
            {...this.state}
            isprofile={true}
            postcreate={this.props.owner}
            currentUser={this.props.user}
            loggedin={{ user: this.props.loggedin }}
            addPost={this.props.addPost}
          />
        );
        break;
      case "activity":
        display = <Activity />
        break;
      default:
        break;
    }
    return (
      <div className="col-md-8">
        <div className="tab-block">
          <Nav variant="tabs">
            <Nav.Item>
              {["Faculty", "Student", "Alumni"].includes(
                this.props.user.role
              ) ? (
                  <Nav.Link
                    name="experiences"
                    to="#experiences"
                    onClick={this.handleSwitch}
                  >
                    Experiences
                  </Nav.Link>
                ) : (
                  <Nav.Link
                    name="events"
                    to="#events"
                    onClick={this.handleSwitch}
                  >
                    Events
                  </Nav.Link>
                )}
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                name="achievement"
                to="#achievement"
                onClick={this.handleSwitch}
              >
                Achievement
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                name="projects"
                to="#projects"
                onClick={this.handleSwitch}
              >
                Projects
              </Nav.Link>
            </Nav.Item>
            {this.props.user.role === "Student" ? <Nav.Item>
              <Nav.Link
                name="application"
                to="#application"
                onClick={this.handleSwitch}
              >
                Applications
              </Nav.Link>
            </Nav.Item> : <Nav.Item>
                <Nav.Link
                  name="internshipoffered"
                  to="#internshipoffered"
                  onClick={this.handleSwitch}
                >
                  Internship Offered
              </Nav.Link>
              </Nav.Item>}
            <Nav.Item>
              <Nav.Link name="posts" to="#posts" onClick={this.handleSwitch}>
                Posts
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                name="activity"
                to="#activity"
                onClick={this.handleSwitch}
              >
                Activity
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <div className="tab-content p30">
            <div id="tab1" className="tab-pane active">
              {display}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(() => { }, { addPost})(Basic);
