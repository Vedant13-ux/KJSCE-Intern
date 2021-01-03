import React from "react";
import Modal from "react-bootstrap/Modal";
import { connect } from 'react-redux'
import { updatebasicinfo } from '../../store/actions/user'
import { apiCall } from '../../services/api'

class Basic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      show2: false,
      userdata: {
        fname: this.props.user.fname,
        lname: this.props.user.lname,
        bio: this.props.user.bio,
        facebook: this.props.user.socialHandles.facebook,
        twitter: this.props.user.socialHandles.twitter,
        linkedin: this.props.user.socialHandles.linkedin,
        github: this.props.user.socialHandles.github,
      },
      selectedFile: null,
      fileLabel: 'Choose Image to Upload'
    };
    this.handleshow = (e) => {
      this.setState({ show: true });
    };
    this.handleClose = (e) => {
      this.setState({ show: false });
    };
    this.handleshow2 = (e) => {
      this.setState({ show2: true });
    };
    this.handleClose2 = (e) => {
      this.setState({ show2: false });
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
      props.updatebasicinfo(data).then(() => this.handleClose());

    };
    this.handleChange = (e) => {
      let userdata = this.state.userdata;
      userdata[e.target.name] = e.target.value;
      this.setState({ userdata });
    };

    this.handleImageUpload = async (e) => {
      e.preventDefault();
      // const data = new FormData();
      // await data.append('file', this.state.selectedFile);
      // await data.append('text', this.props.currentUser.user._id)
      // for (var entry of data.entries()) {
      //   console.log(entry);
      // }
      // const obj = {
      //   id: this.props.currentUser.user._id,
      //   data: data
      // }
      var form = document.forms.namedItem('uploadForm');
      const data = new FormData(form);
      await data.append('id', this.props.currentUser.user._id);

      apiCall('put', '/api/profile/update/photo', data)
        .then((file) => {
          console.log('Image Uploaded');
          console.log(file)
        }).catch((err) => {
          console.log('Image Upload Failed !!!!');
        });
    }

    this.fileValidation = async (e) => {
      // console.log('Changed File');
      await this.setState({
        selectedFile: e.target.files[0]
      });
      // console.log(e.target.files[0]);
    }
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
            {this.props.owner && <div className="uploadBtn" onClick={this.handleshow2}>Update</div>}
            <Modal show={this.state.show2} onHide={this.handleClose2} centered>
              <Modal.Header closeButton>
                <Modal.Title>Update Profile Picture</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form onSubmit={this.handleImageUpload} enctype="multipart/form-data" name="uploadForm">
                  <div className="input-group">
                    <div className="custom-file" style={{ display: 'block' }}>
                      <label className="custom-file-label" style={{ textAlign: "left" }}>{this.state.fileLabel}</label>
                      <input type="file" id="file" name="file" onChange={this.fileValidation} className="custom-file-input" style={{ outline: "none", border: "none" }} accept=".jpg,.png | image/*" required />
                    </div>

                    <div style={{ textAlign: 'center', display: 'block' }}>
                      <button className="ui button">Upload</button>
                    </div>
                  </div>
                </form>
              </Modal.Body>
            </Modal>
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
function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps, { updatebasicinfo })(Basic);

