import React, { Component } from 'react';
import Navbar from "../containers/Global/Navbar";
import PageFooter from "../containers/Global/PageFooter";
// import { apiCall } from "../services/api";
// import { Link } from 'react-router-dom';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    }
  }
  render() {
    return (
      <div id="profile">
        <Navbar currentUser={this.props.currentUser} />
        <section id="content" className="container">
          <div className="page-heading">
            <div className="media clearfix">
              <div className="media-left pr30">
                <a href="/">
                  <img className="media-object mw150" src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="..." />
                </a>
              </div>
              <div className="media-body va-m">
                <h2 className="media-heading">Michael Halls
                  <small> - Profile</small>
                </h2>
                <p className="lead">Lorem ipsum dolor sit amet ctetur adicing elit, sed do eiusmod tempor incididunt</p>
                <div className="media-links">
                  <ul className="list-inline list-unstyled">
                    <li>
                      <a href="/" title="facebook link">
                        <span className="fa fa-facebook-square fs35 text-primary" />
                      </a>
                    </li>
                    <li>
                      <a href="/" title="twitter link">
                        <span className="fa fa-twitter-square fs35 text-info" />
                      </a>
                    </li>
                    <li className="hidden">
                      <a href="/" title="linkedin link">
                        <span className="fa fa-linkedin-square fs35 text-info" />
                      </a>
                    </li>
                    <li className="hidden">
                      <a href="/" title="github link">
                        <span className="fa fa-github-square fs35 text-dark" />
                      </a>
                    </li>
                    <li>
                      <a href="/" title="email link">
                        <span className="fa fa-envelope-square fs35 text-muted" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="panel">
                <div className="panel-heading">
                  <span className="panel-icon">
                    <i className="fa fa-star" />
                  </span>
                  <span className="panel-title"> User Popularity</span>
                </div>
                <div className="panel-body pn">
                  <table className="table mbn tc-icon-1 tc-med-2 tc-bold-last">

                  </table>
                </div>
              </div>
              <div className="panel">
                <div className="panel-heading">
                  <span className="panel-icon">
                    <i className="fa fa-trophy" />
                  </span>
                  <span className="panel-title"> My Skills</span>
                </div>
                <div className="panel-body pb5">
                  <div className="tagsskill">ok</div>
                  <div className="tagsskill">eating</div>
                  <div className="tagsskill">sleeping</div>
                  <div className="tagsskill">doing</div>
                  <div className="tagsskill">ok</div>
                  <div className="tagsskill">eating</div>
                  <div className="tagsskill">sleeping</div>
                  <div className="tagsskill">doing</div>
                </div>
              </div>
              <div className="panel">
                <div className="panel-heading">
                  <span className="panel-icon">
                    <i className="fa fa-pencil" />
                  </span>
                  <span className="panel-title">About Me</span>
                </div>
                <div className="panel-body pb5">

                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="tab-block">
                <ul className="nav nav-tabs">
                  <li className="active">
                    <a href="#tab1" data-toggle="tab">Activity</a>
                  </li>
                  <li>
                    <a href="#tab1" data-toggle="tab">Social</a>
                  </li>
                  <li>
                    <a href="#tab1" data-toggle="tab">Media</a>
                  </li>
                </ul>
                <div className="tab-content p30" style={{ height: '730px' }}>
                  <div id="tab1" className="tab-pane active">

                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <PageFooter />
      </div>
    )
  }
}
export default Profile;