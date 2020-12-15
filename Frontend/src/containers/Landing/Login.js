import React, { Component } from 'react'
import { apiCall } from '../../services/api'
import { Link } from 'react-router-dom'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleChange.bind(this);
    }
    handleChange(e) {
        return this.setState({ [e.target.name]: e.target.value })
    }
    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state);
        // this.props.onAuth(this.state).then(() => { this.props.onVerify(); console.log('Logged In') }).catch(err => console.log(err));
    }
    render() {
        const { password, email } = this.state;
        return (
            <div className="loginForm">
                <form className="ui form" onSubmit={this.handleSubmit}>
                    <div className="heading">Login</div>
                    <div className="field">
                        <label>Somaiya Email</label>
                        <div className="ui left icon input">
                            <input required type="email" name="email"  placeholder="abcd@somaiya.edu" value={email} onChange={this.handleChange} pattern ="^[a-zA-Z0-9._%+-]+@somaiya\.edu$" />
                            <i className="envelope icon"></i>
                        </div>
                    </div>
                    <div className="field">
                        <label>Password</label>
                        <div className="ui left icon input">
                            <input required type="password" name="password" placeholder="Password" onChange={this.handleChange} value={password} />
                            <i className="lock icon"></i>
                        </div>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <button className="big ui button">
                            Login
                        </button>
                    </div>

                </form>
            </div>
        )
    }
}
export default Login;