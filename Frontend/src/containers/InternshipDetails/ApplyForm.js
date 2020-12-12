import React, { Component } from 'react';
import { apiCall } from '../../services/api'

class ApplyForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ques1: "Why should you be hired for this role?",
            ques2: "Are you avaiable for " + this.props.duration + " months, starting immediately? If not, what is the time period you are avaiable for and the earliest date you can start this internhsip on?",
            ans1: '',
            ans2: '',
            applicantId: this.props.user,
            internshipId: this.props.internship,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    handleSubmit(e) {
        e.preventDefault();
        const { applicantId, internshipId } = this.state;
        apiCall('post', 'api/internship/apply', { answers: [this.state.ans1, this.state.ans2], applicantId, internshipId })
            .then(() => {
                console.log('Hello');
                this.props.onApply();
                this.props.onHide();
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <form id="applyForm" className="ui form">
                <div class="field">
                    <label>{this.state.ques1}</label>
                    <textarea
                        maxlength="200"
                        rows="3"
                        required
                        name="ans1"
                        val={this.state.ans1}
                        onChange={this.handleChange}
                    ></textarea>
                </div>
                <div class="field">
                    <label>{this.state.ques2}</label>
                    <textarea
                        maxlength="200"
                        rows="2"
                        required
                        name="ans1"
                        val={this.state.ans2}
                        onChange={this.handleChange}
                    ></textarea>
                </div>
                <button type="button" class="btn btn-default" onClick={this.handleSubmit}>
                    Apply Now
                </button>


            </form>
        )
    }
}
export default ApplyForm