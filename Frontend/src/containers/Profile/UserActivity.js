import React, { Component } from "react";
import { Nav } from "react-bootstrap";
// import { Link } from 'react-router-dom';
import { PostWall } from "../../compenents/Community";
import { apiCall } from "../../services/api";
import Experience  from "./Experience";

class Basic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "experiences",
      posts: this.props.user.posts,
      start: true,
    };
    this.handleSwitch = this.handleSwitch.bind(this);
  }
  componentWillMount() {
    let content = window.location.href.split("#")[1];
    if (content === undefined) return;
    return this.setState({ content: content });
  }
  componentDidMount() {
    // if (!this.props.owner){
    // apiCall("get", '/api/community/posts/getAll', "")
    //   .then((data) => {
    //     this.setState({ posts: data, start: false });
    //   })
    //   .catch((e) => {
    //     this.setState({  start: false });
    //   });
    // }
  }
  handleSwitch(e) {
    return this.setState({ content: e.target.name });
  }
  render() {
    let display;
    switch (this.state.content) {
      case "experiences":
        display = <Experience owner={this.props.owner} user={this.props.user} />;
        break;
      case "posts":
        display = (
          <PostWall
            {...this.state}
            isprofile={true}
            postcreate={this.props.owner}
            currentUser={this.props.user}
            loggedin={{ user: this.props.loggedin }}
          />
        );
        break;
      case "activity":
        display = <div>activity</div>;
        break;
      default:
        break;
    }
    return (
      <div className="col-md-8">
        <div className="tab-block">
          <Nav variant="tabs">
            <Nav.Item>
              <Nav.Link
                name="experiences"
                to="#experiences"
                onClick={this.handleSwitch}
              >
                Experiences
              </Nav.Link>
            </Nav.Item>
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
          <div
            className="tab-content p30"
          >
            <div id="tab1" className="tab-pane active">
              {display}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Basic;
