import React, { Component } from "react";
import Navbar from "../containers/Navbar";
import PageFooter from "../containers/PageFooter";
import RecommInternship from "./RecommInternship"
import { apiCall } from "../services/api"
import NotFoundSVG from "../images/NotFound.js"
import Loading from "../images/Loading"

class InternshipDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exists: false,
      start: true,
      details: {
        faculty: {
          photo: "https://www.w3schools.com/w3css/img_avatar3.png",
          fname: "   ---    ",
          lname: "   ---   ",
        },
        title: "  ---   ",
        skillsRequired: ["    ", "     ", "    ", "      "],
        duration: "  ---   ",
        applyBy: "---",
        posted_on: {
          type: Date,
          default: Date.now(),
        },
        numberOpenings: "   --   ",
        otherRequirements: "   ---   ",
        department: "    ---   ",
        perks: "         ----------                 ",
        whoCanApply: "    -----    ",
        description: "        -------           ",
        type: "    ----    ",

      },
      recommlist: [
        {
          faculty: {
            photo: "https://www.w3schools.com/w3css/img_avatar3.png",
            fname: " --  ",
            lname: "  --  ",
          },
          title: "  --  ",
          duration: "  --  ",
          applyBy: new Date(),
          type: "  --  ",
        },
        {
          faculty: {
            photo: "https://www.w3schools.com/w3css/img_avatar3.png",
            fname: " --  ",
            lname: "  --  ",
          },
          title: "  --  ",
          duration: "  --  ",
          applyBy: new Date(),
          type: "  --  ",
        },
        {
          faculty: {
            photo: "https://www.w3schools.com/w3css/img_avatar3.png",
            fname: " --  ",
            lname: "  --  ",
          },
          title: "  --  ",
          duration: "  --  ",
          applyBy: new Date(),
          type: "  --  ",
        }
      ]
    };
    this.contentDisplay = this.contentDisplay.bind(this);
  }

  componentWillMount() {
    document.documentElement.scrollTop = '0';
    return apiCall('get', 'http://localhost:3001/api/internship/details/' + this.props.match.params.id, '')
      .then(
        async (data) => {
          console.log(data)
          if (Object.keys(data).length !== 0) {
            apiCall('get', 'http://localhost:3001/api/internship/search/skills?skills=' + data["skillsRequired"].join(','))
              .then(
                async (recomm) => {
                  await this.setState({ details: data, recommlist: recomm, exists: true, start: false });
                  console.log(this.state);
                }).catch(
                  (e) => this.setState({ exist: false, start: false })
                )
            return
          } else {
            await this.setState({ exists: false, start: false })
          }

        }

      ).catch(
        (e) => {
          this.setState({ exist: false, start: false })
        }
      )

  }
  contentDisplay(exists, start) {
    console.log("this tbh", exists, start)
    if (start) {
      return (
        <div className="loading-anime">
          <Loading class="loading-wheel" />
        </div>
      )
    }
    if (exists) {
      return (
        <div id="internshipdetail">
          <div class="container">
            <div class="row">
              <div class="col-8">
                <div className="card">
                  <div className="card-body">
                    <h1>{this.state.details.title}</h1>
                    <div class="provider">
                      <img
                        src={this.state.details.faculty.photo}
                        alt="pfp"
                        className="avatar-pro"
                      ></img>
                      <a className="author" href="./home">
                        {this.state.details.faculty.fname} {this.state.details.faculty.lname}
                      </a>
                    </div>
                    <br></br>
                    <div id="iconinfo" class="flex-container">
                      <div class="flex-item">
                        <h4>
                          <i class="fa fa-clock mr-1"></i>Duration
                </h4><p>{this.state.details.duration}</p>
                      </div>
                      <div class="flex-item">
                        <h4>
                          <i className="fa fa-home mr-1"></i>Type
                </h4><p> {this.state.details.type}</p>
                      </div>

                      <div class="flex-item"><h4>
                        <i class="fa fa-hourglass mr-2"></i>Apply by
                </h4><p>Nov 17 {/*this.state.details.applyBy.toDateString().substring(4,10) */}</p></div>
                    </div><hr></hr>
                    <h3>About Internship</h3>
                    <p>{this.state.details.description}</p>
                    <h3>Who can Apply</h3>
                    <p>{this.state.details.whoCanApply}</p>
                    <h3>Other Requirement</h3>
                    <p>{this.state.details.otherRequirements}</p>
                    <h3>skills</h3>
                    <div>
                      {this.state.details.skillsRequired.map((skill, ind) => {
                        return (
                          <div id={ind} className="tagsskill">
                            {skill}
                          </div>
                        );
                      })}
                    </div>
                    <h3>Perks</h3>
                    <p>{this.state.details.perks}</p>
                    <h3> Number of Opening</h3>
                    <p>{this.state.details.numberOpenings}</p>
                    <div className="applynow">
                      <button type="button" class="btn btn-lg btn-default">
                        Apply Now
                </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-4 recommendations">
                <div class="card recomm">
                  <h3>Recommendations</h3>
                  <hr></hr>
                  <div className="scroll">
                    {this.state.recommlist.map((int, ind) => {
                      return <RecommInternship {...int}></RecommInternship>
                    })}
                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>
      )
    } else if (exists === false) {
      return (
        <NotFoundSVG />

      )
    }
  }



  render() {
    const { exists, start } = this.state;
    console.log(exists);
    return (
      <div>
        <Navbar></Navbar>
        {this.contentDisplay(exists, start)}
        <PageFooter />
      </div>
    );
  }
}

export default InternshipDetail;