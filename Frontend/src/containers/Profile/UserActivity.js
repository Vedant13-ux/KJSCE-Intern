import React, { Component } from "react";
import { Nav } from "react-bootstrap";
import { Link } from 'react-router-dom';

class Basic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "experiences",
    };
    this.handleSwitch = this.handleSwitch.bind(this);
  }
  componentWillMount() {
    let content = window.location.href.split("#")[1];
    if (content===undefined) return
    return this.setState({ content: content });
  }
  handleSwitch(e) {
    return this.setState({ content: e.target.eventKey });
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
        display = <div>ok2</div>;
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
              <Nav.Link><Link
                eventKey="experiences"
                to="#experiences"
                onClick={this.handleSwitch}
              >
                Job Experiences
              </Link></Nav.Link>
            </Nav.Item>
            <Nav.Item>
            <Nav.Link><Link eventKey="past" to="#past" onClick={this.handleSwitch}>
                Past Internships
              </Link></Nav.Link>
            </Nav.Item>
            <Nav.Item>
            <Nav.Link><Link
                eventKey="posts"
                to="#posts"
                onClick={this.handleSwitch}
              >
                Posts
              </Link></Nav.Link>
            </Nav.Item>
            <Nav.Item>
            <Nav.Link><Link
                eventKey="activity"
                to="#activity"
                onClick={this.handleSwitch}
              >
                Activity
              </Link></Nav.Link>
            </Nav.Item>
          </Nav>
          <div className="tab-content p30" style={{ height: "730px" }}>
            <div id="tab1" className="tab-pane active">
              {display}
              <h1>heya</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Basic;
