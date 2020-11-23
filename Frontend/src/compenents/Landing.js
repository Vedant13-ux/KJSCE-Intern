import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
import AuthForm from '../containers/Landing/AuthForm';
import Featues from '../containers/Landing/Features'
import AboutUs from '../containers/Landing/AboutUs'
import Contact from '../containers/Landing/Contact'



class Landing extends Component {
    constructor(props) {
        super(props)
        this.state = {
            content: 'Sign Up'
        }
        this.handleSwitch = this.handleSwitch.bind(this);
    }
    handleSwitch(e) {
        return this.setState({ content: e.target.textContent })
    }
    render() {
        var content;
        if (this.state.content === 'Sign Up')
            content = <AuthForm onAuth={this.props.onAuth} buttonText="Register" heading="Sign Up" signUp />
        if (this.state.content === 'Features')
            content = <Featues />
        if (this.state.content === 'About Us')
            content = <AboutUs />
        if (this.state.content === 'Contact')
            content = <Contact />

        return (
            <div>
                <div className="sections">
                    <section className="leftSection">
                        <img src={logo} alt="logo" className="bigLogo" />
                    </section>

                    <section className="rightSection">
                        <nav class="nav justify-content-center">
                            <Link className="nav-link active signup" to="/#signup" onClick={this.handleSwitch} >Sign Up</Link>
                            <Link className="nav-link features" to="/#features" onClick={this.handleSwitch} >Features</Link>
                            <Link className="nav-link about" to="/#about" onClick={this.handleSwitch}>About Us</Link>
                            <Link className="nav-link contact" to="/#contact" onClick={this.handleSwitch} >Contact</Link>
                        </nav>
                        <div className="content">
                            {content}
                        </div>
                    </section>
                </div>
            </div >
        )
    }
};



export default Landing;