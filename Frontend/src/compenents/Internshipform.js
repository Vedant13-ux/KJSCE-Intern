import React, { Component } from 'react';


class Intershipform extends Component{
    constructor(props) {
        super(props);
        this.state = {
            skills: '',
            duration: '',
            applyBy: '',
            noo: '',
            OtherReq: '',
            Department: '',
            perks: '',
            whocanApply:'',

        }
        // this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    render(){
        return (
            <div></div>
        )
    }
}

export default Intershipform;