import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
import AuthForm from '../containers/Landing/AuthForm';
import Featues from '../containers/Landing/Features'
import AboutUs from '../containers/Landing/AboutUs'
import Contact from '../containers/Landing/Contact'
import Verification from '../containers/Landing/Verification';
import Carousel from 'react-bootstrap/Carousel'




class Landing extends Component {
    constructor(props) {
        super(props)
        this.state = {
            content: 'Sign Up',
            linkSent: false
        }
        this.handleSwitch = this.handleSwitch.bind(this);
        this.verify = this.verify.bind(this);
    }
    componentWillMount() {
        let content = window.location.href.split('#')[1];
        if (content === 'signup')
            return this.setState({ content: 'Sign Up' })
        if (content === 'signup')
            return this.setState({ content: 'Login' })
        if (content === 'features')
            return this.setState({ content: 'Features' })
        if (content === 'about')
            return this.setState({ content: 'About Us' })
        if (content === 'contact')
            return this.setState({ content: 'Contact' })
    }
    handleSwitch(e) {
        return this.setState({ content: e.target.textContent })
    }

    verify() {
        this.setState({ content: 'Verification' });
        this.setState({ linkSent: true });
        return;
    }
    render() {
        var content;
        if (this.state.content === 'Sign Up') {
            if (this.state.linkSent) {
                content = <Verification />
            } else {
                content =
                    <Carousel indicators={false}>
                        <Carousel.Item>
                            <div>
                                <AuthForm onAuth={this.props.onAuth} buttonText="Register" heading="Student Signup" signUp onVerify={this.verify} />
                            </div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <AuthForm onAuth={this.props.onAuth} buttonText="Register" heading="Faculty Signup" signUp onVerify={this.verify} />
                        </Carousel.Item>
                    </Carousel>
            }
        }
        if (this.state.content === 'Features')
            content = <Featues />
        if (this.state.content === 'About Us')
            content = <AboutUs />
        if (this.state.content === 'Contact')
            content = <Contact />
        if (this.state.content === 'Verification')
            content = <Verification />
        return (
            <div>
                <div className="sections">
                    <section className="leftSection">
                        <img src={logo} alt="logo" className="bigLogo" />
                    </section>

                    <section className="rightSection">
                        <nav class="nav justify-content-center">
                            <Link className="nav-link active signup" to="/#signup" onClick={this.handleSwitch} >Sign Up</Link>
                            <Link className="nav-link contact" to="/#login" onClick={this.handleSwitch} >Login</Link>
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