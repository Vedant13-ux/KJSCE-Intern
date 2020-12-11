import React, { Component } from 'react'

function Basic(props){
    return (
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
    )


}

export default Basic;