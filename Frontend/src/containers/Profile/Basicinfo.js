import React from "react";
import { Link } from 'react-router-dom'

function Basic(props) {
  return (
    <div className="page-heading">
      <div className="media clearfix">
        <div className="media-left pr30">
          <img
            className="media-object mw150"
            src={props.user.photo}
            alt="..."
          />
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
                <Link href="/" title="facebook link">
                  <span class="fa fa-facebook-square fs35 text-primary"></span>
                </Link>
              </li>
              <li>
                <Link href="/" title="twitter link">
                  <span class="fa fa-twitter-square fs35 text-info"></span>
                </Link>
              </li>
              <li className="hidden">
                <Link href="/" title="linkedin link">
                  <span class="fa fa-linkedin-square fs35 text-info"></span>
                </Link>
              </li>
              <li className="hidden">
                <Link href="/" title="github link">
                  <span class="fa fa-github-square fs35 text-dark"></span>
                </Link>
              </li>
              <li>
                <Link href={'mailto:' + props.user.email} title="email link">
                  <span class="fa fa-envelope-square fs35 text-muted"></span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Basic;
