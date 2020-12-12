import React, { Component } from 'react';
import Navbar from "../containers/Global/Navbar";
import PageFooter from "../containers/Global/PageFooter";
import { apiCall } from "../services/api";
// import { Link } from 'react-router-dom';
import Basic from '../containers/Profile/Basicinfo'
import Moreinfo from '../containers/Profile/Moreinfo'
import UserActivity from '../containers/Profile/UserActivity'

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: 'huzaifa@somaiya.edu',
        // password: {
        //   type: String,
        //   required: true
        // },
        fname: 'huzaifa',
        lname: 'khilawala',
        dept: 'IT',
        role: 'student',
        year: '2nd',
        rollNo: '1914095',
        photo: 'https://www.jeumobi.com/wp-content/uploads/2020/10/among-us-mobile-240x240.png',
        bookmarks: [],
        notifications: [],
        conversations: [],
        interactions: [],
        resume: 'ok',
        internshipsOffered: [],
        applications: [],
        skills: ['python','java','bruh'],
        posts: [],
        liked: [],
        commented: []
      
      
      }
    }
  }
  componentDidMount(){
    apiCall('get', '/api/user/profile/' + this.props.match.params.id, '').then(
      (data)=>{
        console.log(data);
      }
    )
  }
  render() {
    return (
      <div id="profile">
        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet"></link>
        <Navbar currentUser={this.props.currentUser} />
        <section id="content" className="container">
          <Basic user={this.state.user}/>
          <div className="row">
            <Moreinfo user={this.state.user}/>
          <UserActivity user={this.state.user}/>
          </div>
        </section>
        <PageFooter />
        
      </div>
    )
  }
}
export default Profile;