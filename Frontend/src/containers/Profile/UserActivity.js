

import React, { Component } from 'react'

function Basic(props){
    return (
        
            <div className="col-md-8">
              <div className="tab-block">
                <ul className="nav nav-tabs">
                  <li className="active">
                    <a href="/" data-toggle="tab">Activity</a>
                  </li>
                  <li>
                    <a href="/" data-toggle="tab">Social</a>
                  </li>
                  <li>
                    <a href="/" data-toggle="tab">Media</a>
                  </li>
                </ul>
                <div className="tab-content p30" style={{ height: '730px' }}>
                  <div id="tab1" className="tab-pane active">

                  </div>
                </div>
              </div>
            </div>
         

)


}

export default Basic;