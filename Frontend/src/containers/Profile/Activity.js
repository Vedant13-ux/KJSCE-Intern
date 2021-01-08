import React, { Component } from "react";
import NoActivity from '../../images/NoActivity'

class Activity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activity: []
        }

    }
    render() {
        if (this.state.activity.length === 0)
            return (
                <div id="experinece">
                    <NoActivity></NoActivity>
                </div>
            )
    }
}

export default Activity;