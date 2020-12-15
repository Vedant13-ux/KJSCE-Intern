import React, { Component } from 'react';
import { Link } from 'react-router-dom'


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
            facultyId: '',
            role: this.props.role
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(e) {
        return this.setState({ [e.target.name]: e.target.value })
    }
    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state);
        this.props.onAuth(this.state).then(() => { this.props.onVerify(); console.log('Logged In') }).catch(err => console.log(err));
    }

    render() {
        const { fname, lname, email, dept, year, rollNo, password, facultyId } = this.state;
        const { heading, role } = this.props;
        const className = role === "student" ? "two fields" : "field";
        return (

            <form className="ui form authForm" onSubmit={this.handleSubmit}>
                <div className="heading">
                    {role === "student" && <i className=" mr-2 fas fa-user-graduate"></i>}
                    {role === "faculty" && <i class="mr-2 fas fa-user-tie"></i>}
                    {heading}
                </div>
                {role === 'student' && <input type="hidden" name="role" value="Student"></input>}
                {role === 'faculty' && <input type="hidden" name="role" value="Faculty"></input>}

                <div className="field">
                    <label>Name</label>
                    <div className="two fields">
                        <div className="field">
                            <input required type="text" name="fname" placeholder="First Name" value={fname} onChange={this.handleChange} />
                        </div>
                        <div className="field">
                            <input required type="text" name="lname" placeholder="Last Name" value={lname} onChange={this.handleChange} />
                        </div>
                    </div>
                </div>
                <div className="field">
                    <div className="two fields">
                        <div className="twelve wide field">
                            <label>Somaiya Email</label>
                            <div className="ui left icon input">
                                <input required type="email" name="email" placeholder="Somaiya Email" value={email} onChange={this.handleChange} />
                                <i className="envelope icon"></i>
                            </div>
                        </div>
                        {role === "faculty" &&
                            <div className="four wide field">
                                <label>Faculty ID</label>
                                <div className="ui left icon input">
                                    <input required type="text" name="facultyId" placeholder="Faculty ID" value={facultyId} onChange={this.handleChange} />
                                    <i className="ui id card icon"></i>
                                </div>
                            </div>
                        }
                        {role === "student" &&
                            <div className="four wide field">
                                <label>Roll No.</label>
                                <div className="ui left icon input">
                                    <input required type="text" name="rollNo" placeholder="Roll No." value={rollNo} onChange={this.handleChange} />
                                    <i className="ui id card icon"></i>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <div className={className}>
                    <div className="field">
                        <label>Department</label>
                        <select className="ui fluid dropdown" name="dept" onChange={this.handleChange} value={dept} required>
                            <option value="">Department</option>
                            <option value="cs">Computer Science</option>
                            <option value="it">Infomration Technology</option>
                            <option value="mech">Mechanical</option>
                            <option value="extc">Electromics and Telecommunication</option>
                            <option value="etrx">Electronics</option>
                        </select>
                    </div>
                    {role === "student" &&
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
                    }
                </div>
                <div className="field">
                    <label>Password</label>
                    <div className="ui left icon input">
                        <input type="password" name="password" placeholder="Password" onChange={this.handleChange} value={password} />
                        <i className="lock icon"></i>
                    </div>
                </div>
                <div>
                    <Link className="login" to="/login">Already have an account? Login</Link>
                </div>
                <div className="submit">
                    <button className="big ui button">
                        Register
                        </button>
                </div>
            </form>


        )
    }
}




export default AuthForm;