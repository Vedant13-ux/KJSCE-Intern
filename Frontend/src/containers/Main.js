import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Homepage from '../compenents/Homepage'
import Landing from '../compenents/Landing';
import { connect } from 'react-redux';
import { authUser, setCurrentUser } from '../store/actions/auth'
import { internshipApply } from '../store/actions/user'
import { updateRefresh } from '../store/actions/auth'
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
import { logout } from '../store/actions/auth'
import jwtDecode from 'jwt-decode'

class Main extends React.Component {
    async componentWillMount() {
        if (localStorage.jwtToken) {
            var email = '';
            try {
                email = jwtDecode(localStorage.jwtToken)['email'];
            } catch {
                this.props.logout();
            }
        }
        console.log("main mounted");
        console.log(JSON.parse(localStorage.getItem('isAuthenticated')));
        if (!JSON.parse(localStorage.getItem('isAuthenticated'))) this.props.history.push('/');
        else {
            await this.props.updateRefresh(email);
        }
    }
    render() {
        const currentUser = this.props.currentUser;
        if (!currentUser.user._id && localStorage.getItem('isAuthenticated') !== 'false' && JSON.parse(localStorage.getItem('isAuthenticated')) !== null) {
            return <div></div>
        }

        return (
            <div>
                <Switch>
                    <Route exact path="/" render={props => <Landing {...props} currentUser={currentUser} />} />
                    <Route exact path="/home" render={props => <Homepage {...props} currentUser={currentUser} />} />
                    <Route exact path="/messaging" render={props => <Chat {...props} currentUser={currentUser} />} />
                    <Route exact path="/internship/:id" render={props => <IntershipDetail internshipApply={this.props.internshipApply} key={props.match.params.id} {...props} currentUser={currentUser} />} />
                    <Route exact path="/community" render={props => <Community {...props} currentUser={currentUser} />} />
                    <Route exact path="/post/:id" render={props => <Post key={props.match.params.id} {...props} currentUser={currentUser} />} />
                    <Route exact path="/hashtag/:id" render={props => <Hashtag key={props.match.params.id} {...props} currentUser={currentUser} />} />
                    <Route exact path="/verify-email/:token" render={props => <EmailVerificaton {...props} />} />
                    <Route exact path="/profile/:id" render={props => <Profile key={props.match.params.id} {...props} currentUser={currentUser} />} />
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
