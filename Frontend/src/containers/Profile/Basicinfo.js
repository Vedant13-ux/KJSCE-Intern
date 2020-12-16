import React from "react";
import { Link } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'

class Basic extends React.Component {
  constructor(props){
    super(props)
    this.state={
      show:false
    }
    this.handleshow=(e)=>{
      console.log("ok lol")
      this.setState({show:true})
    }
    this.handleClose=(e)=>{
      this.setState({show:false})
    }
    this.handleSubmit=(e)=>{

    }
  }
  render(){
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
          <p className="lead">
            {this.props.user.bio}
          </p>
          <div className="media-links">
            <ul className="list-inline list-unstyled">
              <li>
                <Link to="/" title="facebook link">
                  <span className="fa fa-facebook-square fs35 text-primary"></span>
                </Link>
              </li>
              <li>
                <Link to="/" title="twitter link">
                  <span className="fa fa-twitter-square fs35 text-info"></span>
                </Link>
              </li>
              <li className="hidden">
                <Link to="/" title="linkedin link">
                  <span className="fa fa-linkedin-square fs35 text-info"></span>
                </Link>
              </li>
              <li className="hidden">
                <Link to="/" title="github link">
                  <span className="fa fa-github-square fs35 text-dark"></span>
                </Link>
              </li>
              <li>
                <Link to={'mailto:' + this.props.user.email} title="email link">
                  <span className="fa fa-envelope-square fs35 text-muted"></span>
                </Link>
              </li>
            </ul>
          </div>
          
        </div>
        <button class="edit-but" onClick={this.handleshow}>
        <i class="fa fa-edit"></i>
        </button>
        <Modal show={this.state.show} onHide={this.handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Create a post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.handleSubmit}>
              <div className="ui form">
                <div className="field">
                  <label>About post</label>
                  <textarea
                    maxlength="200"
                    rows="2"
                    required
                    placeholder="What do you want to talk about?"
                    name="content"
                    // val={content}
                    // onChange={this.handleChange}
                  ></textarea>
                </div>

                <div className="submit confirmdiv">
                  <button className="medium ui button confirm">POST</button>
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

export default Basic;
