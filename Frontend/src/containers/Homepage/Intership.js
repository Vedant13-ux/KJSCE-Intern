import React, { Component } from "react";
import { Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

class InternshipList extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.dateFormat = this.dateFormat.bind(this)
  }
  dateFormat() {
    let apply = new Date(this.props.applyBy);
    return apply.toDateString();
  }
  render() {
    const id = '/internship/' + this.props._id;
    return (
      <div className="col-md-4 col-lg-3">
        <div className="card">
          <div className="template">
            <div className="top">
              <img src={this.props.faculty.photo} alt="pfp" className="avatar-pro"></img>
              <Link className="author" to={"/profile/" + this.props.faculty.email.split('@')[0]}>{this.props.faculty.fname} {this.props.faculty.lname}</Link>
            </div>
            <hr className='topHr' />
            <div className="container">
              <h4 className="title">{this.props.title}</h4>
              <p className="description">{this.props.description}</p>

              <div className="extraDetails">
                <p><i className="fa fa-home mr-1"></i>  {this.props.type}</p>
                <p><i className="fa fa-clock mr-1"></i>  {this.props.duration} months</p>
                <p><i className="fa fa-hourglass mr-2"></i>Apply by {this.dateFormat()}</p>
              </div>
            </div>
            <hr></hr>
            <div id="tags-skill" >
              {this.props.skillsRequired.map((skill) => {
                return <span><Badge variant="primary">{skill}</Badge>   </span>;
              })}
            </div>
            <hr></hr>
            <div className="bottom">
              <button
                type="button"
                className="btn btn-default btn-circle btn-md"
              >
                <i className="fa fa-bookmark"></i>
              </button>
              <Link className="btn" to={id}>
                More Info
              </Link>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default InternshipList;
