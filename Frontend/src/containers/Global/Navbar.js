import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import logo from '../../images/logo.png';
import { MContext } from '../../services/Provider'

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: ""
        }
        // this.handleChange = this.handleChange.bind(this);
    }
    // handleChange(e) {
    //     return this.setState({ query: e.target.value });
    // }
    render() {
        return (
            <nav className="navbar navbar-expand-lg fixed-top">
                <div className="container">
                    <Link className="navbar-brand" to="/home">
                        <img src={logo} alt="logo" className="logo" />
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">

                        <div className="form-inline my-2 my-lg-0">
                            <MContext.Consumer>
                                {
                                    context => (
                                        <div><input onKeyPress={e => { if (e.which === 13) { context.searched() } }} onChange={(e) => context.setMessage(e.target.value)} className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" name="internshipSerach" />
                                            <button onClick={(e) => { context.searched() }} className="btn btn-outline-info my-2 my-sm-0" type="submit">Search</button>
                                        </div>)
                                }
                            </MContext.Consumer>

                        </div>
                        <ul className="navbar-nav mr-auto">


                            <li className="nav-item active">
                                <Link className="nav-link" to="/home">
                                    <i className="fas fa-home mr-1"></i>Home <span className="sr-only" to="">(current)</span></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/community">
                                    <i class="fas fa-users mr-1"></i>Community</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/messaging"><i class="fas fa-envelope mr-1"></i>Messaging</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/myinternships"><i class="fas fa-briefcase mr-1"></i>My Internships</Link>
                            </li>

                        </ul>
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/#signup">
                                    <i class="fas fa-user-plus mr-1"></i>Signup</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/#"><i class="fas fa-sign-in-alt mr-1"></i>Signin</Link>
                            </li>
                        </ul>

                    </div>
                </div>
            </nav>
        )
    }

}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser
    }
};

export default connect(mapStateToProps, null)(Navbar);