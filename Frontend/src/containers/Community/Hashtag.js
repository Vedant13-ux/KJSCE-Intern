import React, { Component } from "react";
import Navbar from "../Global/Navbar";
import PageFooter from "../Global/PageFooter";
import { apiCall } from "../../services/api";
import Loading from "../../images/Loading";
import NotFound from "../../images/NotFound";
import { PostWall } from "../../compenents/Community";
import {
    updateLikeActivity,
    updateUnLikeActivity,
    updateCommentActivity,
  } from "../../store/actions/user";
  import { connect } from "react-redux";

class PostMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      start: true,
    }
  }
  componentDidMount() {
    document.documentElement.scrollTop = '0';
    apiCall("get", '/api/community/posts/' + this.props.match.params.id, "")
      .then((data) => {
        this.setState({ data: data, start: false });
        console.log(this.state)
      })
      .catch((e) => {
        console.log("error")
        this.setState({ start: false });
      });
  }
  render() {
    return (
      <div id="postalone">
        <Navbar
          onPage="community"
          currentUser={this.props.currentUser}
          history={this.props.history}
        />
        <div id="heightforfooter">
        {this.state.data !== null ?
          <PostWall
          history={this.props.history}
          isprofile={false}
          postcreate={false}
          posts={[]}
          loggedin={this.props.currentUser}
          currentUser={null}
          updateLikeActivity={this.props.updateLikeActivity}
          updateUnLikeActivity={this.props.updateUnLikeActivity}
          updateCommentActivity={this.props.updateCommentActivity}
        /> : this.state.start ? <div className="loading-anime">
            <Loading className="loading-wheel" />
          </div> :
            // <NotFound />
            <h1>pranked</h1>
        }</div>
        <PageFooter />
      </div>
    );
  }
}

export default connect(() => {}, {
    updateLikeActivity,
    updateUnLikeActivity,
    updateCommentActivity,
  })(PostMain);