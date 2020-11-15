import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Homepage from '../compenents/Homepage'
import Landing from '../compenents/Landing';
import { connect } from 'react-redux';
import AuthForm from '../compenents/AuthForm'
import { authUser } from '../store/actions/auth'

const Main = props => {
    // const { authUser } = { props };
    return (
        <div>
            <Switch>
                <Route exact path="/" render={props => <Landing {...props} />} />

                <Route exact path="/home" render={props => <Homepage {...props} />} />
                {/* <Route
                    exact path='/signin'
                    render={(props) => {
                        return <AuthForm {...props} buttonText="Login" heading="Welcome Back" />
                    }}
                /> */}
                <Route
                    exact path='/signup'
                    render={(props) => {
                        return <AuthForm {...props} buttonText="Signup" heading="Signup Here" signUp />
                    }}
                />

            </Switch>
        </div>
    )
}
function mapStateToProps(state) {
    return {
        currentUser: state.currentUser
    }
}

export default withRouter(connect(mapStateToProps, { authUser })(Main));
