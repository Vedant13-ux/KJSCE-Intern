import React, { Component } from 'react';
import { apiCall } from './api';
export const MContext = React.createContext();  //exporting context object
export class MyProvider extends Component {
    state = { query: "", internships: [] }
    render() {
        return (
            <MContext.Provider value={
                {
                    state: this.state,
                    setMessage: (value) => this.setState({
                        query: value
                    }),
                    setInternships: () => {
                        return (
                            apiCall('get', '/api/internship/search/title/' + this.state.query, '')
                                .then((internships) => {
                                    this.setState({ internships })
                                }).catch((err) => {
                                    console.log(err);
                                })
                        )
                    }
                }}>
                {this.props.children}
            </MContext.Provider>)
    }
}