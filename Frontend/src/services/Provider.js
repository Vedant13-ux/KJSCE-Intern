import React, { Component } from 'react';
export const MContext = React.createContext();  //exporting context object
export class MyProvider extends Component {
    state = { query: "" }
    render() {
        return (
            <MContext.Provider value={
                {
                    state: this.state,
                    setMessage: (value) => this.setState({
                        query: value
                    })
                }}>
                {this.props.children}
            </MContext.Provider>)
    }
}