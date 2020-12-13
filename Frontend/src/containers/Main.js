import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Homepage from '../compenents/Homepage'
import Landing from '../compenents/Landing';
import { connect } from 'react-redux';
import { authUser } from '../store/actions/auth'
import { setCurrentUser } from '../store/actions/auth'
import IntershipDetail from './InternshipDetails/InternshipDetails'
import Community from '../compenents/Community'
import NotFound from '../images/NotFound'
import EmailVerificaton from '../containers/Utils/EmailVerification';
import Profile from '../compenents/Profile';
import MyInternships from '../compenents/MyInternships';
import '../index2.css'


const Main = (props) => {
    const authUser = props.authUser;
    const setCurrentUser = props.setCurrentUser;
    const currentUser = props.currentUser;
    return (
        <div>
            <Switch>
                <Route exact path="/" render={props => <Landing {...props} onAuth={authUser} />} />
                <Route exact path="/home" render={props => <Homepage {...props} currentUser={currentUser} />} />
                <Route exact path="/internship/:id" render={props => <IntershipDetail {...props} currentUser={currentUser} />} />
                <Route exact path="/community" render={props => <Community {...props} currentUser={currentUser} />} />
                <Route exact path="/verify-email/:token" render={props => <EmailVerificaton {...props} onVerify={setCurrentUser} />} />
                <Route exact path="/profile/:id" render={props => <Profile {...props} currentUser={currentUser} />} />
                <Route exact path="/myinternships" render={props => <MyInternships {...props} currentUser={currentUser} />} />
                <Route path="*" render={props => <NotFound {...props} />} />
            </Switch>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser
    }
}

export default withRouter(connect(mapStateToProps, { authUser, setCurrentUser })(Main));
