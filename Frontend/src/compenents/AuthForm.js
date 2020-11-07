import React, { Component } from 'react';

class AuthForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fname: '',
            lname: '',
            email: '',
            dept: '',
            sem: '',
            rollNo: '',
            password: '',

        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        return this.setState({ [e.target.name]: e.target.value })
    }
    render() {
        const { fname, lname, email, dept, sem, rollNo, password } = this.state;
        const { heading, buttonText, signUp } = this.props;
        return (
            (signUp && (
                <div className="student">
                    <div>{heading}</div>
                    <div className="col-3">
                        <input className="effect-16" type="text" id="fname" name="fname" onChnage={this.handleChange} value={fname} />
                        <label>First Name</label>
                        <span className="focus-border"></span>
                    </div>
                    <div className="col-3">
                        <input className="effect-16" type="text" id="lname" name="lname" onChnage={this.handleChange} value={lname} />
                        <label>Last Name</label>
                        <span className="focus-border"></span>
                    </div>

                    <div className="col-3">
                        <input className="effect-16" type="email" name="email" id="email" onChnage={this.handleChange} value={email} />
                        <label>Soamiya Mail</label>
                        <span className="focus-border"></span>
                    </div>
                    <div className="col-3">
                        <input className="effect-16" type="email" name="email" id="email" onChnage={this.handleChange} value={sem} />
                        <label>Soamiya Mail</label>
                        <span className="focus-border"></span>
                    </div>
                    <div className="col-3">
                        <input className="effect-16" type="email" name="email" id="email" onChnage={this.handleChange} value={dept} />
                        <label>Soamiya Mail</label>
                        <span className="focus-border"></span>
                    </div>
                    {/* <div className="ui fluid search selection dropdown dept">
                    <input type="hidden" name="user[department]" required onChnage={this.handleChange} value= />
                    <i className="dropdown icon"></i>
                    <div className="default text">Department</div>
                    <div className="menu">
                        <div className="item" data-value="cs">Computer Science</div>
                        <div className="item" data-value="it">Information Technology</div>
                        <div className="item" data-value="mech">Mechanical</div>
                        <div className="item" data-value="mech">Electronics and Tellecommunication</div>
                        <div className="item" data-value="mech">Electronics</div>
                    </div>
                </div>

                <div className="ui fluid search selection dropdown col-3">
                    <input type="hidden" name="user[semester]" required />
                    <i className="dropdown icon"></i>
                    <div className="default text">Semester</div>
                    <div className="menu">
                        <div className="item">Semester 1</div>
                        <div className="item">Semester 2</div>
                        <div className="item">Semester 3</div>
                        <div className="item">Semester 4</div>
                        <div className="item">Semester 5</div>
                        <div className="item">Semester 6</div>
                        <div className="item">Semester 7</div>
                        <div className="item">Semester 8</div>
                    </div>
                </div> */}

                    <div className="col-3">
                        <input className="effect-16" id="rollNo" name="rollNo" required onChnage={this.handleChange} value={rollNo} />
                        <label>Roll No.</label>
                        <span className="focus-border"></span>
                    </div>
                    <div className="col-3 password">
                        <input className="effect-16" id="password" name="password" required type="password" onChnage={this.handleChange} value={password} />
                        <label>Enter Password</label>
                        <span className="focus-border"></span>
                    </div>
                    {/* <div className="col-3 password">
                    <input className="effect-16" placeholder="" required type="password" onChnage={this.handleChange} value= />
                    <label>Confirm Password</label>
                    <span className="focus-border"></span>
                </div> */}
                    <div className="submit">
                        <button className="btn btn-info">{buttonText}</button>
                    </div>
                </div>
            ))
        )
    }
}



export default AuthForm;