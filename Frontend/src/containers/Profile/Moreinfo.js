import React, { Component } from 'react'

function Basic(props){
    return (
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
    )


}

export default Basic;