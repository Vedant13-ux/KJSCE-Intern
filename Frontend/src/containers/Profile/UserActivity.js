import React ,{Component} from 'react'
import { Nav } from 'react-bootstrap';

class Basic extends Component {
  constructor(props){
    super(props)
    this.state={
      content: 'experiences',
    }
    this.handleSwitch = this.handleSwitch.bind(this);
  }
  componentWillMount() {
    let content = window.location.href.split('#')[1];
    return this.setState({ content: content })
}
handleSwitch(e) {
    return this.setState({ content: e.target.textContent })
}
  render (){
    switch(this.state.content){
      case "ok":

      default:
        
    }
    return (
    <div className="col-md-8">
      <div className="tab-block">
        <Nav variant="tabs" defaultActiveKey="experiences">
          <Nav.Item>
            <Nav.Link eventKey="experiences" to="/#experiences" onClick={this.handleSwitch}>Job Experiences</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="past" to="/#past" onClick={this.handleSwitch}>Past Internships</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="posts" to="/#posts" onClick={this.handleSwitch}>Posts</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="activity" to="/#activity" onClick={this.handleSwitch}>Activity</Nav.Link>
          </Nav.Item>
        </Nav>
        <div className="tab-content p30" style={{ height: '730px' }}>
          <div id="tab1" className="tab-pane active">

          </div>
        </div>
      </div>
    </div>


  )}


}

export default Basic;