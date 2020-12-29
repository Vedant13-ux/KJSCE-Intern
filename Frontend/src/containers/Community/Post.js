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
    this.state={
        data:null,
        start:true,
    }
  }
  componentDidMount(){
    apiCall("get", '/api/community/posts/'+this.props.match.params.id, "")
    .then((data) => {
      this.setState({ data: data, start: false });
      console.log(this.state)
    })
    .catch((e) => {
      console.log("error")
      this.setState({  start: false });
    });
  }
  render() {
    return (
      <div id="postalone">
        <Navbar
          currentUser={this.props.currentUser}
          history={this.props.history}
        />
        {this.state.data!==null?
        <Post
          isprofile={false}
          loggedin={this.props.currentUser.user}
          userprofile={null}
          options={this.state.data}
        />:this.state.start?<Loading/>:
        <NotFound/>
        }
        <PageFooter />
      </div>
    );
  }
}

export default PostMain;
