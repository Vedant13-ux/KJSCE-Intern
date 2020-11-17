import React, { Component } from "react";
import Navbar from "../containers/Navbar";
import PageFooter from "../containers/PageFooter";
import RecommInternship from "./RecommInternship"
import "./temp.css";

class InternshipDetail extends Component {
  constructor(props) {
    super(props);
    this.data = new URLSearchParams(this.props.location.search);
    this.id = Number.parseInt(this.data.get("id"), 10);
    //get data with id and assign to state
    this.state = {
      faculty: {
        photo: "https://www.w3schools.com/w3css/img_avatar3.png",
        fname: "phunsuk",
        lname: "vangdo",
      },
      title: "Frontend Stuff",
      skillsRequired: ["react", "redux", "css", "javascript"],
      duration: "2 months",
      applyBy: new Date(),
      posted_on: {
        type: Date,
        default: Date.now(),
      },
      numberOpenings: 4,
      otherRequirements: "should know english",
      department: "IT",
      perks: "certificate and stuff",
      whoCanApply: "smart people",
      description: "do react redux everyday",
      type: "work from home",
    };
    this.recommlist = [
      {
        faculty: {
          photo: "https://www.w3schools.com/w3css/img_avatar3.png",
          fname: "phunsuk",
          lname: "vangdo",
        },
        title: "Frontend Stuff",
        duration: "2 months",
        applyBy: new Date(),
        type: "work from home",
      },
      {
        faculty: {
          photo: "https://www.w3schools.com/w3css/img_avatar3.png",
          fname: "phunsuk",
          lname: "vangdo",
        },
        title: "Frontend Stuff",
        duration: "2 months",
        applyBy: new Date(),
        type: "work from home",
      },
      {
        faculty: {
          photo: "https://www.w3schools.com/w3css/img_avatar3.png",
          fname: "phunsuk",
          lname: "vangdo",
        },
        title: "Frontend Stuff",
        duration: "2 months",
        applyBy: new Date(),
        type: "work from home",
      },
      {
        faculty: {
          photo: "https://www.w3schools.com/w3css/img_avatar3.png",
          fname: "phunsuk",
          lname: "vangdo",
        },
        title: "Frontend Stuff",
        duration: "2 months",
        applyBy: new Date(),
        type: "work from home",
      },
    ]
  }
  render() {
    return (
      <div>
        <Navbar></Navbar>
        <div id="internshipdetail">
          <div class="container">
            <div class="row">
              <div class="col-8">
                <div className="card">
                  <div className="card-body">
                    <h1>{this.state.title}</h1>
                    <p>
                      <i className="fa fa-home mr-1"></i> {this.state.type}
                    </p>
                    <div class="provider">
                      <img
                        src={this.state.faculty.photo}
                        alt="pfp"
                        className="avatar-pro"
                      ></img>
                      <a className="author" href="./home">
                        {this.state.faculty.fname} {this.state.faculty.lname}
                      </a>
                    </div>
                    <br></br>
                    <div id="iconinfo" class="flex-container">
                      <div class="flex-item-left">
                        <h4>
                          <i class="fa fa-clock mr-1"></i>Duration
                </h4><p>{this.state.duration}</p>
                      </div>
                      <div class="flex-item-right"><h4>
                        <i class="fa fa-hourglass mr-2"></i>Apply by
                </h4><p>{this.state.duration}</p></div>
                    </div><hr></hr>
                    <h3>About Internship</h3>
                    <p>{this.state.description}</p>
                    <h3>Who can Apply</h3>
                    <p>{this.state.whoCanApply}</p>
                    <h3>Other Requirement</h3>
                    <p>{this.state.otherRequirements}</p>
                    <h3>skills</h3>
                    <div>
                      {this.state.skillsRequired.map((skill, ind) => {
                        return (
                          <div id={ind} className="tagsskill">
                            {skill}
                          </div>
                        );
                      })}
                    </div>
                    <h3>Perks</h3>
                    <p>{this.state.perks}</p>
                    <h3> Number of Opening</h3>
                    <p>{this.state.numberOpenings}</p>
                    <div className="applynow">
                      <button type="button" class="btn btn-lg btn-primary">
                        Apply Now
                </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-4">
                <div class="card recomm">
                  <h3>Recommendations</h3>
                  <hr></hr>
                  {this.recommlist.map((int, ind) => {
                    return <RecommInternship {...int}></RecommInternship>
                  })}
                </div>

              </div>
            </div>
          </div>
        </div>
        <PageFooter />
      </div>
    );
  }
}

export default InternshipDetail;
