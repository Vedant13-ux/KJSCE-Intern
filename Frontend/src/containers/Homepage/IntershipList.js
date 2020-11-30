import React, { Component } from "react";
import Internship from "./Intership";
import { apiCall } from "../../services/api";
import { MContext } from '../../services/Provider'
import Loading from "../../images/Loading"

class InternshipList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      internships: [],
      start: true,
      searching: false
    };
  }
  componentWillMount() {
    // static contextType = Context;
    console.log(this.context.query)
    let url = '/api/internship/search/all';
    apiCall('get', url, '')
      .then((internships) => {
        return this.setState({ ...this.state, internships, start: false })
      })
      .catch(err => {
        console.log(err);
        return this.setState({ ...this.state, start: false })

      })
  }
  // searchInternships(){}

  render() {
    if (this.state.start) {
      return (
        <div className="loading-anime">
          <Loading class="loading-wheel" />
        </div>
      )
    }
    else {
      return (
        <div className="homeSection">
          <div id="top-bar">
            <button type="button" className="btn btn-default btn-circle btn-lg"><i class="fa fa-filter"></i>
            </button>
          </div>
          <div id="intershiplist">
            <div class="row">
              {/* {this.state.searching === false &&
                (
                  this.state.internships.map((internship) => {
                    return (
                      <Internship key={internship._id} {...internship}></Internship>
                    );
                  })
                )
              } */}
              {this.state.searching === false &&
                (
                  <MContext.Consumer>
                    {(context) => {
                      context.setInternships();
                      context.state.internships.map((internship) => {
                        return (
                          <Internship key={internship._id} {...internship}></Internship>
                        );
                      })
                    }}
                  </MContext.Consumer>
                )
              }
            </div>

          </div>
        </div>
      );
    }
  }
}
Internship.contextType = MContext;
export default InternshipList;
