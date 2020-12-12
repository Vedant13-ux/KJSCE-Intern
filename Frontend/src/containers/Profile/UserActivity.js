import React from 'react'
import { Nav } from 'react-bootstrap';

function Basic(props) {
  return (

    <div className="col-md-8">
      <div className="tab-block">
        <Nav variant="tabs" defaultActiveKey="experiences">
          <Nav.Item>
            <Nav.Link eventKey="experiences">Job Experiences</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="past">Past Internships</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="posts">Posts</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="activity">Activity</Nav.Link>
          </Nav.Item>
        </Nav>
        <div className="tab-content p30" style={{ height: '730px' }}>
          <div id="tab1" className="tab-pane active">

          </div>
        </div>
      </div>
    </div>


  )


}

export default Basic;