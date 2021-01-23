import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Homepage from '../compenents/Homepage'
import Landing from '../compenents/Landing';
import { connect } from 'react-redux';
import { } from '../store/actions/auth'
import { internshipApply } from '../store/actions/user'
import { updateRefresh, logout, setAuthorizationHeader, authUser, setCurrentUser } from '../store/actions/auth'
import IntershipDetail from './InternshipDetails/InternshipDetails'
import Community from '../compenents/Community'
import NotFound from '../images/NotFound'
import EmailVerificaton from '../containers/Utils/EmailVerification';
import Profile from '../compenents/Profile';
import Post from './Community/Post'
import Hashtag from './Community/Hashtag'
import Bookmarks from '../compenents/Bookmarks'
import Chat from '../containers/chat/Chat'
import '../index2.css'
import jwtDecode from 'jwt-decode'
import withAuth from '../hocs/withAuth'

class Main extends React.Component {
    async componentWillMount() {
        if ((localStorage.jwtToken)) {
            console.log('Token is there')
            var email = '';
            try {
                email = await jwtDecode(localStorage.jwtToken)['email'].split('@')[0];
                console.log(email);
                setAuthorizationHeader(localStorage.jwtToken);
                this.props.updateRefresh(email);

            } catch (err) {
                console.log(err);
                this.props.logout();
                this.props.history.push('/');

            }
        } else {
            this.props.history.push('/');
        }
        console.log("main mounted");
    }
    render() {
        const currentUser = this.props.currentUser;
        if (!currentUser.user._id && localStorage.getItem('isAuthenticated') !== 'false' && JSON.parse(localStorage.getItem('isAuthenticated')) !== null) {
            return <div></div>
        }

        return (
            <div>
                <Switch>
                    <Route exact path="/" render={props => <Landing {...props} isAuthenticated={currentUser.isAuthenticated} />} />
                    <Route path="/home" component={withAuth(Homepage)} />
                    <Route exact path="/messaging" render={props => <Chat {...props} currentUser={currentUser} />} />
                    <Route exact path="/internship/:id" render={props => <IntershipDetail internshipApply={this.props.internshipApply} key={props.match.params.id} {...props} currentUser={currentUser} />} />
                    <Route exact path="/community" render={props => <Community {...props} currentUser={currentUser} />} />
                    <Route exact path="/post/:id" render={props => <Post key={props.match.params.id} {...props} currentUser={currentUser} />} />
                    <Route exact path="/hashtag/:id" render={props => <Hashtag key={props.match.params.id} {...props} currentUser={currentUser} />} />
                    <Route exact path="/verify-email/:token" render={props => <EmailVerificaton {...props} />} />
                    <Route exact path="/profile/:id" component={withAuth(Profile)} />
                    <Route exact path="/bookmarks" render={props => <Bookmarks {...props} currentUser={currentUser} />} />
                    <Route path="*" render={props => <NotFound {...props} />} />
                </Switch>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser
    }
}

export default withRouter(connect(mapStateToProps, { authUser, setCurrentUser, updateRefresh, internshipApply, logout })(Main));
