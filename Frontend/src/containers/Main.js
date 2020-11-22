import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Homepage from '../compenents/Homepage'
import Landing from '../compenents/Landing';
import { connect } from 'react-redux';
import { authUser } from '../store/actions/auth'
import IntershipDetail from './InternshipDetails/InternshipDetails'
import Community from '../compenents/Community'
import NotFound from '../images/NotFound'
const Main = (props) => (
    <div>
        <Switch>
            <Route exact path="/" render={props => <Landing {...props} onAuth={authUser} />} />
            <Route exact path="/home" render={props => <Homepage {...props} />} />
            <Route exact path="/internship/:id" render={props => <IntershipDetail {...props} />} />
            <Route exact path="/community" render={props => <Community {...props} />} />
            <Route path="*" render={props => <NotFound {...props} />} />
        </Switch>
    </div>
)

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser
    }
}

export default withRouter(connect(mapStateToProps, { authUser })(Main));
