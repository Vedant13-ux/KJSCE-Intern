import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg fixed-top">
                <div className="container">
                    <Link className="navbar-brand" to="/home">
                        <span className="material-icons mr-2">
                            school
                        </span>
                        KJ Intern
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <div className="form-inline my-2 my-lg-0">
                                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-info my-2 my-sm-0" type="submit">Search</button>
                            </div>
                            <li className="nav-item active">
                                <Link className="nav-link" to="/home">
                                    <i className="fas fa-home mr-1"></i>Home <span className="sr-only" to="">(current)</span></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/community">
                                    <i class="fas fa-users mr-1"></i>Community</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/link"><i class="fas fa-envelope mr-1"></i>Messaging</Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/signup">
                                    <i class="fas fa-user-plus mr-1"></i>Signup</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/signin"><i class="fas fa-sign-in-alt mr-1"></i>Signin</Link>
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