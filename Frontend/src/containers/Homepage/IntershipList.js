import React, { Component } from "react";
import Internship from "./Intership";
import { apiCall } from "../../services/api";
import { MContext } from '../../services/Provider'

class InternshipList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      internships: [],
      query: ""
    };
  }
  componentWillMount() {
    // static contextType = Context;
    console.log(this.context.query)
    let url = '/api/internship/search/all';
    apiCall('get', url, '')
      .then((internships) => {
        return this.setState({ internships })
      })
      .catch(err => {
        console.log(err);
      })
  }
  // searchInternships(){}

  render() {
    return (
      <div className="homeSection">
        <div id="top-bar">
          <button type="button" className="btn btn-default btn-circle btn-lg"><i class="fa fa-filter"></i>
          </button>
        </div>
        <div id="intershiplist">
          <div class="row">
            {this.state.internships.map((internship) => {
              return (
                <Internship key={internship._id} {...internship}></Internship>
              );
            })}
          </div>
          <MContext.Consumer>
            {(context) => {
              if (this.state.query !== context.state.query && context.state.query !== "") {
                return apiCall('get', '/api/internship/search/title/' + context.state.query, '')
                  .then((interns) => {
                    console.log(interns)
                  })
                  .catch(err => console.log(err))
              }
            }}
          </MContext.Consumer>
        </div>
      </div>
    );
  }
}
Internship.contextType = MContext;
export default InternshipList;
