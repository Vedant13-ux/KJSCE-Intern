import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
import AuthForm from '../containers/Landing/AuthForm';


class Landing extends Component {
    constructor(props) {
        super(props)
        this.state = {
            content: 'SignUp'
        }
    }
    content = document.querySelector('.content');
    render() {
        return (
            <div>
                <div className="sections">
                    <section className="leftSection">
                        <img src={logo} alt="logo" className="bigLogo" />
                    </section>

                    <section className="rightSection">
                        <nav class="nav justify-content-center">
                            <Link className="nav-link active signup" to="/#signup" >Sign Up</Link>
                            <Link className="nav-link features" to="/#features" >Features</Link>
                            <Link className="nav-link about" to="/#about" >Abouts Us</Link>
                            <Link className="nav-link contact" to="/#contact" >Contact</Link>
                        </nav>
                        <div className="content">
                            <AuthForm onAuth={this.props.onAuth} buttonText="Register" heading="Sign Up" signUp />
                        </div>
                    </section>
                </div>
            </div>
        )
    }
};



export default Landing;