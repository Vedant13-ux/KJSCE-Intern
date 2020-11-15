import React, { Component } from "react";
import { Badge } from "react-bootstrap";

class InternshipList extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }
  render() {
    return (
      <div className="card">
        <div className="template">
          <div className="top">
            <img src={this.props.data.avatar} alt="pfp" className="avatar-pro"></img>
            <a className="author" href="./home">{this.props.data.provider}</a>
          </div>
          <hr className='topHr' />
          <div className="container">
            <h4 className="title">{this.props.data.title}</h4>
            <p className="description">{this.props.data.description}</p>

            <div className="extraDetails">
              <p><i class="fa fa-home mr-1"></i>  {this.props.data.type}</p>
              <p><i class="fa fa-clock mr-1"></i>  {this.props.data.duration}</p>
              <p><i class="fa fa-hourglass mr-2"></i>Apply by {this.props.data.applyBy}</p>
            </div>
          </div>
          <hr></hr>
          <div id="tags-skill" >
            {this.props.data.tags.map((ele) => {
              return <span><Badge variant="primary">{ele}</Badge>   </span>;
            })}
          </div>
          <hr></hr>
          <div className="bottom">
            <button
              type="button"
              className="btn btn-default btn-circle btn-md"
            >
              <i class="fa fa-bookmark"></i>
            </button>
            <button className="btn moreInfo">
              More Info
            </button>
          </div>

        </div>
      </div>
    );
  }
}

export default InternshipList;
