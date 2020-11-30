import React, { Component } from "react";
import { apiCall } from "../services/api";
export const MContext = React.createContext(); //exporting context object
export class MyProvider extends Component {
  state = {
    query: "",

    list: [],
  };
  componentDidMount() {
    // console.log(this.context.query);
    let url = "/api/internship/search/all";
    apiCall("get", url, "")
      .then((internships) => {
        return this.setState({ ...this.state, list:internships});
      })
      .catch((err) => {
        console.log(err);
        return this.setState({ ...this.state });
      });
  }
  render() {
    return (
      <MContext.Provider
        value={{
          state: this.state,
          setMessage: (value) =>
            this.setState({
              ...this.state,query: value,
            }),
            searched:()=>{
                apiCall("get", "/api/internship/search/title/"+this.state.query, "")
                    .then((internships) => {
                        console.log("sahi hua")
                        return this.setState({ ...this.state, list:internships });
                    })
                // this.setState({...this.state,list:data})
            },
        }}
      >
        {this.props.children}
      </MContext.Provider>
    );
  }
}
