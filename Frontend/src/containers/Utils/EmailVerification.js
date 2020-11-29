import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { apiCall } from '../../services/api';

class Emailverification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVerified: false,
            emailToken: this.props.match.params.token,
            status: 'Your Email is Being Verified ...'
        }
    }
    componentWillMount() {
        console.log(this.state.emailToken)
        apiCall('get', '/api/auth/verify-email/' + this.state.emailToken, '')
            .then(async (user) => {
                console.log('User is Verified');
                this.props.onVerify(user);
                await this.setState({
                    status: 'Email Verification Completed. Redirecting to KJSCE Connect.'
                });
                this.props.history.push('/home')

            })
            .catch(async err => {
                await this.setState({ status: 'Email Verification Failed. Relaod the page or try to signup again.' || err.message });
            })
    }
    render() {
        const content = this.state.status;
        return (
            <div className="emailVerification container" >
                <h1>{content}</h1>
            </div >
        )

    }
}

export default Emailverification;

