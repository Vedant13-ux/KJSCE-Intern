import React, { Component } from "react";
import Internship from "./Intership";
import { MContext } from "../../services/Provider";
import Loading from "../../images/Loading";
import { FilterInternships } from '../Global/Utilities'

class InternshipList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      internships: [],
      start: true,
      query: "",
    };
  }
  componentWillMount() {
  }

  render() {
    // if (this.state.start) {
    //   return (
    //     <div className="loading-anime">
    //       <Loading class="loading-wheel" />
    //     </div>
    //   );
    // } else {
    return (
      <div className="homeSection">
        <FilterInternships />
        <MContext.Consumer>
          {(context) => {
            return (
              <div id="intershiplist">
                <div class="row">
                  {context.state.list.map((internship) => {
                    return (
                      <Internship
                        key={internship._id}
                        {...internship}
                      ></Internship>
                    );
                  })}
                </div>
              </div>
            );

            // if (this.state.query !== context.state.query && context.state.query !== "") {
            //   return apiCall('get', '/api/internship/search/title/' + context.state.query, '')
            //     .then((interns) => {
            //       console.log(interns)
            //     })
            //     .catch(err => console.log(err))
            // }
            // return <p>{context.state.query}</p>
          }}
        </MContext.Consumer>
      </div>
    );
  }
}
Internship.contextType = MContext;
export default InternshipList;
