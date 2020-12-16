import React, { Component } from "react";
import Navbar from "../Global/Navbar";
import PageFooter from "../Global/PageFooter";
import RecommInternship from "./RecommInternship"
import { apiCall } from "../../services/api"
import NotFoundSVG from "../../images/NotFound.js"
import Loading from "../../images/Loading"
import Modal from "react-bootstrap/Modal";
import { Multiselect } from "multiselect-react-dropdown";
import CKEditor from 'ckeditor4-react';



class InternshipDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exists: false,
      start: true,
      details: {},
      recommlist: [],
      user: this.props.currentUser.user,
      applied: false,
      owner: true,
      show1: false,
      show2: false,
      emails: [{ text: "Hello" }, { text: "Vedant" }],
      role: "Student",
      subject: '',
      text: '',
      ques1: "Why should you be hired for this role?",
      ques2: "Are you avaiable for " + this.props.duration + " months, starting immediately? If not, what is the time period you are avaiable for and the earliest date you can start this internhsip on?",
      ans1: '',
      ans2: '',
      error: ''
    };
    this.contentDisplay = this.contentDisplay.bind(this);
    this.handleClose1 = () => this.setState({ show1: false });
    this.handleShow1 = () => this.setState({ show1: true });
    this.handleClose2 = () => this.setState({ show2: false });
    this.handleShow2 = () => this.setState({ show2: true });
    this.onSendMail = this.onSendMail.bind(this);
    this.handleApply = this.handleApply.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.multiselectRef = React.createRef();
    this.onEditorChange = this.onEditorChange.bind(this);
  }


  // For Mailing Applicants
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  onEditorChange(evt) {
    this.setState({
      text: evt.editor.getData()
    });
  }
  getApplicantsEmail() {
    var emails = [];
    this.state.details.applicants.map(app => emails.push({ text: app['email'] }));
    return emails;
  }
  async onSendMail(e) {
    e.preventDefault();
    console.log('Onsend aaya');
    var emails = this.multiselectRef.current.getSelectedItems();
    if (emails.length === 0) {
      return await this.setState({ erros: 'Atleast select one Recepient' });
    }
    var emailArray = [];
    emails.forEach((email) => {
      emailArray.push(email.text);
    });
    var mailBody = {
      subject: this.state.subject,
      text: this.state.text,
      to: emailArray,
    };
    console.log(mailBody);
    apiCall('post', "/api/internship/mailapplicants", { mailBody, userId: "5fc81a619619ea0017ecb856", internshipId: this.state.details._id })
      .then(() => {
        console.log('Sent Mail');
        this.handleClose1();
      })
      .catch(err => {
        console.log(err)
        this.setState({ errors: err.message });
      })
  }




  componentWillMount() {
    document.documentElement.scrollTop = '0';
    return apiCall('get', '/api/internship/details/' + this.props.match.params.id, '')
      .then(
        async (data) => {
          console.log(data)
          if (Object.keys(data).length !== 0) {
            apiCall('get', '/api/internship/search/skills?skills=' + data["skillsRequired"].join(','))
              .then(
                async (recomm) => {
                  if (this.state.user.applications.includes(this.props.match.params.id)) {
                    await this.setState({ applied: true })
                  }
                  await this.setState({ details: data, recommlist: recomm, exists: true, start: false });
                  await this.setState({ emails: this.getApplicantsEmail() });
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

  // For Applying in a Internship
  handleApply(e) {
    e.preventDefault();
    console.log('Apply ma aaay');
    const applicantId = "5fc81a619619ea0017ecb856";
    const internshipId = this.state.details._id;
    const applyBody = { answers: [this.state.ans1, this.state.ans2], applicantId, internshipId };
    console.log(applyBody);
    apiCall('post', '/api/internship/apply', applyBody)
      .then(async () => {
        console.log('Hello');
        await this.setState({ applied: true });
        this.props.onHide();
      })
      .catch(err => console.log(err))
  }

  contentDisplay(exists, start) {
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
                      <a className="author" href={"./profile/"+this.props.faculty.email.split('@')[0]}>
                        {this.state.details.faculty.fname} {this.state.details.faculty.lname}
                      </a>
                    </div>
                    <br></br>
                    <div id="iconinfo" class="flex-container">
                      <div class="flex-item">
                        <h4>
                          <i class="fa fa-clock mr-1"></i>Duration
                </h4><p>{this.state.details.duration} months</p>
                      </div>
                      <div class="flex-item">
                        <h4>
                          <i className="fa fa-home mr-1"></i>Type
                </h4><p> {this.state.details.type}</p>
                      </div>

                      <div class="flex-item"><h4>
                        <i class="fa fa-hourglass mr-2"></i>Apply by
                    </h4><p>{(new Date(this.state.details.applyBy)).toDateString()}</p></div>
                    </div><hr></hr>
                    <h3>About Internship</h3>
                    <p>{this.state.details.description}</p>
                    <h3>Who can Apply</h3>
                    <p>{this.state.details.whoCanApply}</p>
                    <h3>Other Requirement</h3>
                    <p>{this.state.details.otherRequirements}</p>
                    <h3>Skills Required</h3>
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

                    <h3>
                      Applicants {this.state.owner &&
                        <div>
                          <button onClick={this.handleShow1} className="mailAppl ui small button">Mail Applicants</button>
                          <Modal show={this.state.show1} onHide={this.handleClose1} centered>
                            <Modal.Header closeButton backdrop="static">
                              <Modal.Title>Send Mail</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <div className="toField">
                                <label>To</label>
                                <Multiselect
                                  options={this.state.emails}
                                  selectedValues={this.state.emails}
                                  displayValue="text"
                                  onSearch={this.handleSkills}
                                  ref={this.multiselectRef}
                                />
                              </div>
                              <form className="ui form" onSubmit={this.onSendMail}>
                                <div className="ui field">
                                  <label>Subject</label>
                                  <input type="text" required name="subject" onChange={this.handleChange}></input>
                                </div>
                                <div className="ui field">
                                  <label>Text</label>
                                  {/* <textarea required name="text" onChange={this.handleChange}></textarea> */}

                                  <CKEditor
                                    data={this.state.text}
                                    onChange={this.onEditorChange} />

                                </div>

                                <div style={{ textAlign: 'center' }}>
                                  <button className="ui button" >Send</button>
                                </div>
                                <p style={{ color: 'red' }}>{this.state.error}</p>
                              </form>
                            </Modal.Body>
                          </Modal>
                        </div>
                      }
                    </h3>
                    <span className="appliList">
                      {
                        this.state.details.applicants.map(app =>
                          <span className="applicant">
                            <img src={app.photo} alt=""></img>
                            <span className="name">{app.fname} {app.lname}</span>
                          </span>
                        )}
                    </span>
                    {this.state.role === "Student" &&
                      <div>
                        {!this.state.applied &&
                          <div>
                            <div className="applynow">
                              <button type="button" class="btn btn-lg btn-default" onClick={this.handleShow2}>
                                Apply Now
                            </button>
                            </div>
                            <Modal show={this.state.show2} onHide={this.handleClose2} centered backdrop="static">
                              <Modal.Header closeButton>
                                <Modal.Title>Application</Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                                <form id="applyForm" className="ui form" onSubmit={this.handleApply}>
                                  <div class="field">
                                    <label>{this.state.ques1}</label>
                                    <textarea
                                      maxlength="200"
                                      rows="3"
                                      required
                                      name="ans1"
                                      val={this.state.ans1}
                                      onChange={this.handleChange}
                                    ></textarea>
                                  </div>
                                  <div class="field">
                                    <label>{this.state.ques2}</label>
                                    <textarea
                                      maxlength="200"
                                      rows="2"
                                      required
                                      name="ans2"
                                      val={this.state.ans2}
                                      onChange={this.handleChange}
                                    ></textarea>
                                  </div>
                                  <div style={{ textAlign: 'center' }}>
                                    <button class="ui small button" >
                                      Apply Now
                                    </button>
                                  </div>
                                </form>
                              </Modal.Body>
                            </Modal>
                          </div>
                        }
                        {this.state.appiled &&
                          <div className="applynow">
                            <button type="button" class="btn btn-lg btn-default" disabled>
                              Applied
                            </button>
                          </div>
                        }
                      </div>
                    }
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
        </div >
      )
    } else if (exists === false) {
      return (
        <NotFoundSVG />

      )
    }
  }



  render() {
    const { exists, start } = this.state;
    return (
      <div>
        <Navbar currentUser={this.props.currentUser} history={this.props.history}></Navbar>
        {this.contentDisplay(exists, start)}
        <PageFooter />
      </div>
    );
  }
}

export default InternshipDetail;