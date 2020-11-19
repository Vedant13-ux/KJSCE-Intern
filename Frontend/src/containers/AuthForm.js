import React, { Component } from 'react';
import { authUser } from '../store/actions/auth'


class AuthForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fname: '',
            lname: '',
            email: '',
            dept: '',
            year: '',
            rollNo: '',
            password: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(e) {
        return this.setState({ [e.target.name]: e.target.value })
    }
    handleSubmit(e) {
        e.preventDefault();
        authUser(this.state).then(() => {
            console.log('Logged in Successfully'); 
        })
    }

    render() {
        const { fname, lname, email, dept, year, rollNo, password } = this.state;
        const { heading, buttonText, signUp } = this.props;
        return (
            (signUp &&
                <form className="ui form authForm" onSubmit={this.handleSubmit}>
                    <div className="heading">{heading}</div>
                    <div className="field">
                        <label>Name</label>
                        <div className="two fields">
                            <div className="field">

                                <input type="text" name="fname" placeholder="First Name" value={fname} onChange={this.handleChange} />

                            </div>
                            <div className="field">
                                <input type="text" name="lname" placeholder="Last Name" value={lname} onChange={this.handleChange} />
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <div className="two fields">
                            <div className="twelve wide field">
                                <label>Somaiya Email</label>
                                <div className="ui left icon input">
                                    <input type="email" name="email" placeholder="Somaiya Email" value={email} onChange={this.handleChange} />
                                    <i className="envelope icon"></i>
                                </div>
                            </div>
                            <div className="four wide field">
                                <label>Roll No.</label>
                                <div className="ui left icon input">
                                    <input type="text" name="rollNo" placeholder="Roll No." value={rollNo} onChange={this.handleChange} />
                                    <i className="ui id card icon"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="two fields">
                        <div className="field">
                            <label>Department</label>
                            <select className="ui fluid dropdown" name="dept" onChange={this.handleChange} value={dept}>
                                <option value="">Department</option>
                                <option value="cs">Computer Science</option>
                                <option value="it">Infomration Technology</option>
                                <option value="mech">Mechanical</option>
                                <option value="extc">Electromics and Telecommunication</option>
                                <option value="etrx">Electronics</option>
                            </select>
                        </div>
                        <div className="field">
                            <label>Year</label>
                            <select className="ui fluid dropdown" name="year" onChange={this.handleChange} value={year}>
                                <option value="">Year</option>
                                <option value="1">FY</option>
                                <option value="2">SY</option>
                                <option value="3">TY</option>
                                <option value="4">LY</option>
                            </select>
                        </div>
                    </div>
                    <div className="field">
                        <label>Password</label>
                        <div className="ui left icon input">
                            <input type="password" name="password" placeholder="Password" onChange={this.handleChange} value={password} />
                            <i className="lock icon"></i>
                        </div>
                    </div>
                    <div className="submit">
                        <button class="big ui button">
                            {buttonText}
                        </button>
                    </div>


                </form >
            )
        )
    }
}



export default AuthForm;