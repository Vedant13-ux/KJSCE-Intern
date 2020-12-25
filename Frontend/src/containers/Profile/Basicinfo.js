import React from "react";
import Modal from "react-bootstrap/Modal";
import { connect } from 'react-redux'
import { updatebasicinfo } from '../../store/actions/user'

class Basic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      userdata: {
        fname: this.props.user.fname,
        lname: this.props.user.lname,
        bio: this.props.user.bio,
        facebook: this.props.user.socialHandles.facebook,
        twitter: this.props.user.socialHandles.twitter,
        linkedin: this.props.user.socialHandles.linkedin,
        github: this.props.user.socialHandles.github,
      },
    };
    this.handleshow = (e) => {
      this.setState({ show: true });
    };
    this.handleClose = (e) => {
      this.setState({ show: false });
    };
    this.handleSubmit = (e) => {
      e.preventDefault();
      let data = {
        id: this.props.user._id,
        user: {
          fname: this.state.userdata.fname,
          lname: this.state.userdata.lname,
          bio: this.state.userdata.bio,
          socialHandles: {
            facebook: this.state.userdata.facebook,
            twitter: this.state.userdata.twitter,
            linkedin: this.state.userdata.linkedin,
            github: this.state.userdata.github,
          }
        }
      };
      console.log(data)
      props.updatebasicinfo(data).then(()=>this.handleClose())
    };
    this.handleChange = (e) => {
      let userdata = this.state.userdata;
      userdata[e.target.name] = e.target.value;
      this.setState({ userdata });
    };
  }
  render() {
    const {
      bio,
      fname,
      lname,
      facebook,
      twitter,
      linkedin,
      github,
    } = this.state.userdata;
    return (
      <div className="page-heading">
        <div className="media clearfix">
          <div className="media-left pr30">
            <img
              className="media-object mw150"
              src={this.props.user.photo}
              alt="..."
            />
          </div>
          <div className="media-body va-m">
            <h2 className="media-heading">
              {this.props.user.fname + " " + this.props.user.lname}
              <small> - {this.props.user.role}</small>
            </h2>
            <p className="lead">{this.props.user.bio}</p>
            <div className="media-links">
              <ul className="list-inline list-unstyled">
                {this.props.user.socialHandles.facebook !== "" && (
                  <li>
                    <a target="_blank" rel="noreferrer" href={this.props.user.socialHandles.facebook} title="facebook link">
                      <span className="fa fa-facebook-square fs35 text-primary"></span>
                    </a>
                  </li>
                )}
                {this.props.user.socialHandles.twitter !== "" && (
                  <li>
                    <a target="_blank" rel="noreferrer" href={this.props.user.socialHandles.twitter} title="twitter link">
                      <span className="fa fa-twitter-square fs35 text-info"></span>
                    </a>
                  </li>
                )}
                {this.props.user.socialHandles.linkedin !== "" && (
                  <li className="hidden">
                    <a target="_blank" rel="noreferrer" href={this.props.user.socialHandles.linkedin} title="linkedin link">
                      <span className="fa fa-linkedin-square fs35 text-info"></span>
                    </a>
                  </li>
                )}
                {this.props.user.socialHandles.github !== "" && (
                  <li className="hidden">
                    <a target="_blank" rel="noreferrer" href={this.props.user.socialHandles.github} title="github link">
                      <span className="fa fa-github-square fs35 text-dark"></span>
                    </a>
                  </li>
                )}
                <li>
                  <a target="_blank" rel="noreferrer"
                    href={"mailto:" + this.props.user.email}
                    title="email link"
                  >
                    <span className="fa fa-envelope-square fs35 text-muted"></span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          {this.props.owner && <button className="edit-but" onClick={this.handleshow}>
            <i className="fa fa-edit"></i>
          </button>}
          <Modal show={this.state.show} onHide={this.handleClose} centered>
            <Modal.Header closeButton>
              <Modal.Title>Edit info</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={this.handleSubmit}>
                <div className="ui form">
                  <div className="field">
                    <label>Name</label>
                    <div className="two fields">
                      <div className="field">
                        <input
                          required
                          type="text"
                          name="fname"
                          placeholder="First Name"
                          value={fname}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="field">
                        <input
                          required
                          type="text"
                          name="lname"
                          placeholder="Last Name"
                          value={lname}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="field">
                    <label>Bio</label>
                    <textarea
                      maxlength="200"
                      rows="2"
                      required
                      placeholder="What do you want to talk about?"
                      name="bio"
                      value={bio}
                      onChange={this.handleChange}
                    ></textarea>
                  </div>
                  <div className="field">
                    <label>facebook link</label>
                    <input
                      name="facebook"
                      type="url"
                      placeholder="Password"
                      onChange={this.handleChange}
                      value={facebook}
                    />
                  </div>
                  <div className="field">
                    <label>twitter link</label>
                    <input
                      name="twitter"
                      type="url"
                      placeholder="Password"
                      onChange={this.handleChange}
                      value={twitter}
                    />
                  </div>
                  <div className="field">
                    <label>linkedin link</label>
                    <input
                      name="linkedin"
                      type="url"
                      placeholder="Password"
                      onChange={this.handleChange}
                      value={linkedin}
                    />
                  </div>
                  <div className="field">
                    <label>github link</label>
                    <input
                      name="github"
                      type="url"
                      placeholder="Password"
                      onChange={this.handleChange}
                      value={github}
                    />
                  </div>
                  <div className="submit confirmdiv">
                    <button className="medium ui button confirm">
                      CONFIRM
                    </button>
                  </div>
                </div>
              </form>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    );
  }
}

export default connect(()=>{},{updatebasicinfo})(Basic);
