import React, { Component } from "react";
import { Nav } from "react-bootstrap";
// import { Link } from 'react-router-dom';
import { PostWall } from '../../compenents/Community'
import { apiCall } from "../../services/api";

class Basic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "experiences",
      posts:this.props.user.posts,
      start:true
    };
    this.handleSwitch = this.handleSwitch.bind(this);
  }
  componentWillMount() {
    let content = window.location.href.split("#")[1];
    if (content === undefined) return
    return this.setState({ content: content });
  }
  componentDidMount(){
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
        display = <div>ok</div>;
        break;
      case "past":
        display = <div>ok1</div>;
        break;
      case "posts":
        display = <PostWall {...this.state} isprofile={true} postcreate={this.props.owner} currentUser={{user:this.props.user}} />;
        break;
      case "activity":
        display = <div>ok3</div>;
        break;
      default:
        break;
    }
    return (
      <div className="col-md-8">
        <div className="tab-block">
          <Nav variant="tabs" defaultActiveKey="experiences">
            <Nav.Item>
              <Nav.Link
                name="experiences"
                to="#experiences"
                onClick={this.handleSwitch}
              >Job Experiences
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link name="past" to="#past" onClick={this.handleSwitch}>
                Past Internships
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                name="posts"
                to="#posts"
                onClick={this.handleSwitch}
              >
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
          <div className="tab-content p30" style={{ maxHeight: "800px", overflowY: 'scroll', marginTop:'40px' }}>
            <div id="tab1" className="tab-pane active">
            {display}
          </div>
        </div>
      </div>
      </div >
    );
  }
}

export default Basic;
