import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Homepage from '../compenents/Homepage'
import Landing from '../compenents/Landing';
import { connect } from 'react-redux';
import { authUser, setCurrentUser } from '../store/actions/auth'
import { updateRefresh } from '../store/actions/user'
import IntershipDetail from './InternshipDetails/InternshipDetails'
import Community from '../compenents/Community'
import NotFound from '../images/NotFound'
import EmailVerificaton from '../containers/Utils/EmailVerification';
import Profile from '../compenents/Profile';
import Post from './Community/Post'
import Bookmarks from '../compenents/Bookmarks'
import '../index2.css'

class Main extends React.Component {
    async componentWillMount() {
        console.log("main mounted");
        console.log(JSON.parse(localStorage.getItem('isAuthenticated')));
        if (!JSON.parse(localStorage.getItem('isAuthenticated'))) this.props.history.push('/');
        else {
            await this.props.updateRefresh(localStorage.getItem('email').split('@')[0]);
        }
    }
    render() {
        console.log('Main ka Render');
        const currentUser = this.props.currentUser;
        console.log(currentUser)
        if (!currentUser.user._id && localStorage.getItem('isAuthenticated') !== 'false' && JSON.parse(localStorage.getItem('isAuthenticated')) !== null) {
            return <div></div>
        }

        return (
            <div>
                <Switch>
                    <Route exact path="/" render={props => <Landing {...props} currentUser={currentUser} />} />
                    <Route exact path="/home" render={props => <Homepage {...props} currentUser={currentUser} />} />
                    <Route exact path="/internship/:id" render={props => <IntershipDetail key={props.match.params.id} {...props} currentUser={currentUser} />} />
                    <Route exact path="/community" render={props => <Community {...props} currentUser={currentUser} />} />
                    <Route exact path="/post/:id" render={props => <Post key={props.match.params.id} {...props} currentUser={currentUser} />} />
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

export default withRouter(connect(mapStateToProps, { authUser, setCurrentUser, updateRefresh })(Main));
