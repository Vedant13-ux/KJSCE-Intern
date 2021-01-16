import React, { Component } from "react";
import NoActivity from '../../images/NoActivity'

class Activity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activity: this.props.activity
        }

    }
    render() {
        if (this.props.activity.length === 0)
            return (
                <div id="experience">
                    <NoActivity></NoActivity>
                </div>
            )
        else{
            return (
                <div id="experience">
                        
                </div>
            )
        }
    }
}

export default Activity;