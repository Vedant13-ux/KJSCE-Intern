import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import logo from '../../images/logo.png';
import { MContext } from '../../services/Provider'
import { connect } from 'react-redux';
import { logout } from '../../store/actions/auth'

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            user: this.props.currentUser.user,
            isAuthenticated: this.props.currentUser.isAuthenticated,
            onPage: this.props.onPage,
            showDropdown: false
        }
        this.showDropdown = this.showDropdown.bind(this);
        this.logout = this.logout.bind(this);
    }
    async logout(e) {
        e.preventDefault();
        await this.props.logout();
        this.props.history.push('/');
    }
    showDropdown() {
        console.log(this.state.showDropdown);
        this.setState({ showDropdown: !this.state.showDropdown })
    }

    render() {
        const rightContent = () => {
            if (this.state.isAuthenticated) {
                return (
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item userProfile">
                            <img className="avatar-pro" src={this.state.user.photo} alt="user-profile" />
                            <Link to={'/profile/' + this.state.user.email.split('@')[0]} className="nav-link username">{this.state.user.fname} {this.state.user.lname}
                            </Link>
                            <i className="fa" onClick={this.showDropdown} >&#xf0d7;</i>
                            {
                                this.state.showDropdown &&
                                <div className="profile-dropdown" aria-labelledby="dropdownMenuButton" >
                                    <Link className="dropdown-item" to={'/profile/' + this.state.user.email.split('@')[0]}>My Profile</Link>
                                    <Link className="dropdown-item" to="">Account</Link>
                                    <Link className="dropdown-item" to="" onClick={this.logout}>Logout</Link>
                                </div>
                            }

                        </li>
                    </ul>
                )
            } else {
                return (
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/#signup">
                                <i className="fas fa-user-plus mr-1"></i>Signup</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/#"><i className="fas fa-sign-in-alt mr-1"></i>Signin</Link>
                        </li>
                    </ul>
                )
            }
        }
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
                                        <div><input onKeyPress={e => { if (e.which === 13) { context.filter() } }} onChange={(e) => context.setMessage(e.target.value)} className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" name="internshipSerach" />
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
                                    <i className="fas fa-users mr-1"></i>Community</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/messaging"><i className="fas fa-envelope mr-1"></i>Messaging</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/myinternships"><i className="fas fa-briefcase mr-1"></i>My Internships</Link>
                            </li>

                        </ul>

                        {rightContent()}

                    </div>
                </div>
            </nav >
        )
    }

}
function mapStateToProps(state) {
    return {
        currentUser: state.currentUser
    }
}



export default connect(mapStateToProps, { logout })(Navbar);