import React, { Component } from "react";

function Basic(props) {
  return (
    <div className="col-md-4">
      <div className="panel">
        <div className="panel-heading">
          <span className="panel-icon">
            <i className="fa fa-star" />
          </span>
          <span className="panel-title">Info</span>
        </div>
        <div className="panel-body pn">
          <table className="table mbn tc-icon-1 tc-med-2 tc-bold-last">
            <tbody>
              <tr>
                <td>Department</td>
                <td>{props.user.dept}</td>
              </tr>
              <tr>
                <td>Year</td>
                <td>{props.user.year}</td>
              </tr>
              <tr>
                <td>Roll number</td>
                <td>{props.user.rollNo}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="panel">
        <div className="panel-heading">
          <span className="panel-icon">
            <i className="fa fa-trophy" />
          </span>
          <span className="panel-title">Skills</span>
        </div>
        <div className="panel-body pb5">
          {props.user.skills.map((s, i) => {
            return <div className="tagsskill">{s}</div>;
          })}
        </div>
      </div>
      <div className="panel">
        <div className="panel-heading">
          <span className="panel-icon">
            <i className="fa fa-pencil" />
          </span>
          <span className="panel-title">Certificates</span>
        </div>
        <div className="panel-body pb5"></div>
      </div>
    </div>
  );
}

export default Basic;
