import React, { Component } from "react";
import Navbar from "../Global/Navbar";
import PageFooter from "../Global/PageFooter";
import { apiCall } from "../../services/api";
import Loading from "../../images/Loading";
import NotFound from "../../images/NotFound";
import { Post } from "../../compenents/Community";

class PostMain extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Navbar
          currentUser={this.props.currentUser}
          history={this.props.history}
        />
        <Post
          isprofile={false}
        //   id={id}
        //   key={id}
        //   loggedin={this.props.currentUser.user}
        //   options={this.props.posts[id]}
        />
        <PageFooter />
      </div>
    );
  }
}

export default PostMain;
