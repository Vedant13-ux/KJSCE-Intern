import React, { Component } from "react";

function Basic(props) {
  return (
    <div className="page-heading">
      <div className="media clearfix">
        <div className="media-left pr30">
          <a href="/">
            <img
              className="media-object mw150"
              src={props.user.photo}
              alt="..."
            />
          </a>
        </div>
        <div className="media-body va-m">
          <h2 className="media-heading">
            {props.user.fname + " " + props.user.lname}
            <small> - {props.user.role}</small>
          </h2>
          <p className="lead">
            Lorem ipsum dolor sit amet ctetur adicing elit, sed do eiusmod
            tempor incididunt
          </p>
          <div className="media-links">
            <ul className="list-inline list-unstyled">
              <li>
                <a href="/" title="facebook link">
                <span class="fa fa-facebook-square fs35 text-primary"></span>
                </a>
              </li>
              <li>
                <a href="/" title="twitter link">
                <span class="fa fa-twitter-square fs35 text-info"></span>
                </a>
              </li>
              <li className="hidden">
                <a href="/" title="linkedin link">
                <span class="fa fa-linkedin-square fs35 text-info"></span>
                </a>
              </li>
              <li className="hidden">
                <a href="/" title="github link">
                <span class="fa fa-github-square fs35 text-dark"></span>
                </a>
              </li>
              <li>
                <a href={'mailto:'+props.user.email} title="email link">
                <span class="fa fa-envelope-square fs35 text-muted"></span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Basic;
