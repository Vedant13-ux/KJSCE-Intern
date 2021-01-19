import React from "react";
import Navbar from "../containers/Global/Navbar";
import PageFooter from "../containers/Global/PageFooter";
import { apiCall } from "../services/api";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import NoPost from '../images/NoPost';
import { addPost, updateLikeActivity, updateUnLikeActivity, updateCommentActivity } from '../store/actions/user'
import { connect } from "react-redux";
import Moment from 'react-moment';

class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isMobile: false };
    this.checkResolution = this.checkResolution.bind(this);
  }

  checkResolution(e) {
    if (document.documentElement.offsetWidth < 900 && !this.state.isMobile)
      this.setState({ isMobile: true });
    else if (document.documentElement.offsetWidth > 900 && this.state.isMobile)
      this.setState({ isMobile: false });
  }

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    if (document.documentElement.offsetWidth < 900)
      this.setState({ isMobile: true });
    else this.setState({ isMobile: false });
    window.addEventListener("resize", this.checkResolution);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.checkResolution);
  }

  render() {
    return (
      <div className="wrapper">
        <Navbar isMobile={this.state.isMobile} {...this.props} onPage="community" />
        <ScrollTopButton />
        <Feed
          isMobile={this.state.isMobile}
          currentUser={this.props.currentUser}
          addPost={this.props.addPost} history={this.props.history}
          updateLikeActivity={this.props.updateLikeActivity}
          updateUnLikeActivity={this.props.updateUnLikeActivity}
          updateCommentActivity={this.props.updateCommentActivity}
        />
        <PageFooter />
      </div>
    );
  }
}

class ScrollTopButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      styles: { display: "none" },
    };
    this.visible = false;
    this.scrollHandler = this.scrollHandler.bind(this);
    this.resizeHandler = this.resizeHandler.bind(this);
  }

  scrollHandler() {
    if (window.pageYOffset > document.documentElement.clientHeight / 2) {
      if (!this.state.visible) this.setState({ visible: true });
    } else {
      if (this.state.visible) this.setState({ visible: false });
    }
  }

  resizeHandler() {
    if (this.isThrottled === undefined) this.isThrottled = false;
    if (this.isQueueEmpty === undefined) this.isQueueEmpty = true;

    if (!this.isThrottled) {
      this.isThrottled = true;
      this.setState({
        styles: {
          position: "fixed",
          top: "4.4rem",
          left: `${document.querySelector(".feed-wrapper").getBoundingClientRect()
            .left - 60
            }px`,
          display: `${this.state.visible ? "block" : "none"}`,
        },
      });
      setTimeout(() => {
        this.isThrottled = false;
        if (!this.isQueueEmpty) this.resizeHandler();
      }, 100);
    } else {
      if (this.isQueueEmpty) this.isQueueEmpty = false;
    }
  }

  scrollToTop(e) {
    e.preventDefault();
    window.scrollTo(0, 0);
  }

  componentDidMount() {
    document.addEventListener("scroll", this.scrollHandler);
    window.addEventListener("resize", this.resizeHandler);
  }
  componentWillUnmount() {
    document.removeEventListener("scroll", this.scrollHandler);
    window.removeEventListener("resize", this.resizeHandler);
  }

  render() {
    if (!document.querySelector(".feed-wrapper"))
      this.styles = { display: "none" };
    else
      this.styles = {
        position: "fixed",
        top: "4.4rem",
        left: `${document.querySelector(".feed-wrapper").getBoundingClientRect().left -
          60
          }px`,
        display: `${this.state.visible ? "block" : "none"}`,
      };

    return (
      <div id="scrollTopButton" style={this.styles}>
        <div href="#" onClick={this.scrollToTop}>
          <i className="far fa-caret-square-up"></i>
        </div>
      </div>
    );
  }
}

class PostCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      postdata: {
        content: "",
        image: "",
        author: this.props.user._id
      },
    };
    this.handleChange = (e) => {
      var postdata = this.state.postdata;
      postdata[e.target.name] = e.target.value;
      this.setState({ postdata });
    };
    this.handleSubmit = (e) => {
      e.preventDefault();
      console.log(this.state.postdata);
      apiCall('post', '/api/community/posts/create', { ...this.state.postdata })
        .then(async (post) => {
          this.props.addPost(post);
          return this.props.history.push('/post/' + post._id)
        }).catch((err) => {
          console.log(err);
        });
    };
    this.handleClose = (e) => {
      this.setState({ show: false });
    };
    this.handleShow = (e) => {
      this.setState({ show: true });
    };
  }
  render() {
    const { content, image } = this.state.postdata;
    return (
      <div className="posting-area">
        <div onClick={this.handleShow} className="posting-text">
          start post
        </div>
        <div className="posting-but">
          <div className="posting-but1" onClick="">
            <i className="material-icons">insert_photo</i>Photo
          </div>
          <div className="posting-but2" onClick="">
            <i className="material-icons">videocam</i>Video
          </div>
        </div>
        <Modal show={this.state.show} onHide={this.handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Create a post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.handleSubmit}>
              <div className="ui form">
                <div className="field">
                  <label>About post</label>
                  <textarea
                    maxlength="200"
                    rows="2"
                    required
                    placeholder="What do you want to talk about?"
                    name="content"
                    value={content}
                    onChange={this.handleChange}
                  ></textarea>
                </div>
                <div className="field">
                  <label>Image URL</label>
                  <input onChange={this.handleChange} value={image} type="url" name="image" placeholder="Link of Image"></input>
                </div>

                <div className="submit confirmdiv">
                  <button className="medium ui button confirm">POST</button>
                </div>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      start: true,
      filter: {
        Student: true,
        Faculty: true,
        Alumni: true,
        Council: true,
        it: true,
        cs: true,
        mech: true,
        extc: true,
        etrx: true,
        "1": true,
        "2": true,
        "3": true,
        "4": true,
      }
    };
    this.handleSubmit = (e) => {
      e.preventDefault()
      let roles = []
      let allroles = ["Student", "Faculty", "Alumni", "Council"]
      for (let i in allroles) {
        if (this.state.filter[allroles[i]]) {
          roles.push(allroles[i])
        }
      }
      apiCall("put", "/api/community/posts/getSpecific", { roles })
        .then((data) => {
          console.log("hua sahi se", data)
          // this.setState({ posts: data });
        })
        .catch((e) => {
          console.log("error");
        });
    }
    this.handleChange = (e) => {
      console.log(e.target.checked, e.target.id)
      let d = this.state.filter
      d[e.target.id] = e.target.checked
      this.setState({ filter: d })
    }
  }

  componentWillMount() {
    apiCall("get", "/api/community/posts/getAll", "")
      .then((data) => {
        this.setState({ posts: data, start: false });
      })
      .catch((e) => {
        console.log("error");
        this.setState({ start: false });
      });
  }

  render() {
    return (
      <div id="feed">
        <div className="content-wrapper feed-wrapper">
          <PostWall
            addPost={this.props.addPost} history={this.props.history}
            isprofile={false}
            postcreate={true}
            loggedin={this.props.currentUser}
            currentUser={null}
            {...this.state}
            updateLikeActivity={this.props.updateLikeActivity}
            updateUnLikeActivity={this.props.updateUnLikeActivity}
            updateCommentActivity={this.props.updateCommentActivity}
          />
          <div className="right-side">
            <div className="controls">
              <form onSubmit={this.handleSubmit}>
                <h5>From</h5>
                <div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      defaultChecked={true}
                      onChange={this.handleChange}
                      id="Student"
                    />
                    <label className="form-check-label" for="Student">
                      Student
                  </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      defaultChecked={true}
                      onChange={this.handleChange}
                      id="Faculty"
                    />
                    <label className="form-check-label" for="Faculty">
                      Faculty
                  </label>
                  </div>
                  <div className="form-check">
                    <input type="checkbox" className="form-check-input"
                      defaultChecked={true}
                      onChange={this.handleChange} id="Alumni" />
                    <label className="form-check-label" for="Alumni">
                      Alumni
                  </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      defaultChecked={true}
                      onChange={this.handleChange}
                      id="Council"
                    />
                    <label className="form-check-label" for="Council">
                      Council
                  </label>
                  </div>
                </div>
                <h5>Department</h5>
                <div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      defaultChecked={true}
                      onChange={this.handleChange}
                      id="cs"
                    />
                    <label className="form-check-label" for="cs">
                      Computer Science
                  </label>
                  </div>
                  <div className="form-check">
                    <input type="checkbox" className="form-check-input"
                      defaultChecked={true}
                      onChange={this.handleChange} id="mech" />
                    <label className="form-check-label" for="mech">
                      Mechanical
                  </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      defaultChecked={true}
                      onChange={this.handleChange}
                      id="etrx"
                    />
                    <label className="form-check-label" for="etrx">
                      Electronics
                  </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      defaultChecked={true}
                      onChange={this.handleChange}
                      id="extc"
                    />
                    <label className="form-check-label" for="extc">
                      Electronics and Telecommunication
                  </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      defaultChecked={true}
                      onChange={this.handleChange}
                      id="it"
                    />
                    <label className="form-check-label" for="it">
                      Information Technology
                  </label>
                  </div>
                </div>
                <h5>Year</h5>
                <div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      defaultChecked={true}
                      onChange={this.handleChange}
                      id="1"
                    />
                    <label className="form-check-label" for="1">
                      FY
                  </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      defaultChecked={true}
                      onChange={this.handleChange}
                      id="2"
                    />
                    <label className="form-check-label" for="2">
                      SY
                  </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      defaultChecked={true}
                      onChange={this.handleChange}
                      id="3"
                    />
                    <label className="form-check-label" for="3">
                      TY
                  </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      defaultChecked={true}
                      onChange={this.handleChange}
                      id="4"
                    />
                    <label className="form-check-label" for="4">
                      LY
                  </label>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">
                  Apply
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export class PostWall extends React.Component {

  getPostById(id) {
    if (!this.props.posts[id]) return;
    return (
      <Post
        isprofile={this.props.isprofile}
        id={id}
        key={id}
        userprofile={this.props.currentUser}
        loggedin={this.props.loggedin}
        options={this.props.posts[id]}
        updateLikeActivity={this.props.updateLikeActivity}
        updateUnLikeActivity={this.props.updateUnLikeActivity}
        updateCommentActivity={this.props.updateCommentActivity}
      />
    );
  }

  renderAll() {
    let elem = [];
    for (let key in this.props.posts) {
      elem.unshift(this.getPostById(key));
    }
    if (!elem.length) {
      if (this.props.start) elem.push(<div></div>);
      else
        elem.push(
          <NoPost></NoPost>
        );
    }
    return elem;
  }

  render() {
    let content;
    content = this.renderAll();

    return (
      <div className="post-wall">

        {this.props.postcreate && <PostCreate addPost={this.props.addPost} history={this.props.history} user={this.props.loggedin.user} />}
        {content}
      </div>
    );
  }
}

export class Post extends React.Component {
  constructor(props) {
    super(props);
    let options = props.options;
    // console.log(options.comments)
    this.state = {
      commentsExpanded: false,
      likes: options.likedBy.length,
      isLiked: options.likedBy.includes(props.loggedin.user._id),
      comments: options.comments,
      imageLoaded: false,
    };
    this.id = options._id;
    this.content = options.content;
    if (!props.isprofile) {
      this.avatar = options.author.photo;
      this.name = options.author.fname + " " + options.author.lname;
      this.email = options.author.email;
    } else {
      this.avatar = props.userprofile.photo;
      this.name = props.userprofile.fname + " " + props.userprofile.lname;
      this.email = props.userprofile.email;
    }
    function dateFormat(k) {
      let apply = new Date(k);
      return apply.toDateString();
    }
    this.date = dateFormat(options.created);
    this.img = options.image;
    this.likeHandler = this.likeHandler.bind(this);
    this.addCommentHandler = this.addCommentHandler.bind(this);

    this.showComments = this.showComments.bind(this);
    this.hideComment = this.hideComment.bind(this);
    this.addCommentDecorator = this.addCommentDecorator.bind(this);
    this.handleImageLoad = this.handleImageLoad.bind(this);
  }
  handleImageLoad(e) {
    this.setState({ imageLoaded: true });
  }

  get commentsCount() {
    return this.state.comments.length;
  }
  likeHandler(e) {
    e.preventDefault();
    let button = e.target.closest(".likes");
    let lik = this.state.likes;
    if (!this.state.isLiked) {
      apiCall("post", "/api/community/posts/like/" + this.id, {
        id: this.props.loggedin.user._id,
      })
        .then((date) => {
          console.log(date);
          button.classList.toggle("liked");
          lik++;
          this.setState({
            ...this.state,
            isLiked: !this.state.isLiked,
            likes: lik,
          });
          var activity = {
            created: date,
            post: this.props.options
          }
          this.props.updateLikeActivity(activity);
        })
        .catch((e) => console.log(e));
    } else {
      apiCall("put", "/api/community/posts/like/" + this.id, {
        id: this.props.loggedin.user._id,
      })
        .then((data) => {
          console.log(data);
          button.classList.toggle("liked");
          lik--;
          this.setState({
            ...this.state,
            isLiked: !this.state.isLiked,
            likes: lik,
          });
          // console.log(this.props.options._id);
          this.props.updateUnLikeActivity(this.props.options._id);
        })
        .catch((e) => console.log(e));
    }
  }

  addCommentHandler(e) {
    e.preventDefault();
    let form = e.target;
    let commentText = form.text.value.trim();
    if (!commentText.length) {
      form.text.value = "";
      return;
    }
    apiCall("post", "/api/community/posts/comments/" + this.id, {
      id: this.props.loggedin.user._id,
      text: commentText,
    }).then(() => {
      this.state.comments.push({
        author: {
          fname: this.props.loggedin.user.fname,
          lname: this.props.loggedin.user.lname,
          photo: this.props.loggedin.user.photo,
        },
        text: commentText,
      });
      form.text.value = "";
      this.setState({ ...this.state, commentsExpanded: true });
    });
  }

  showComments(e) {
    e.preventDefault();
    this.setState({ ...this.state, commentsExpanded: true });
  }
  hideComment(e) {
    e.preventDefault();
    this.setState({ ...this.state, commentsExpanded: false });
  }

  addCommentDecorator(e) {
    e.preventDefault();
    this.showComments(e);
    this.addCommentHandler(e);
    // this.scrollToBottom();
  }

  render() {
    return (
      <div className="post" id={this.id}>
        <div className="post-wrapper">
          <UserInfo
            userAvatar={this.avatar}
            date={this.date}
            email={this.email}
            username={this.name}
          />
          <div className="post-content">
            <p>{this.content}</p>

            <img onLoad={this.handleImageLoad} src={this.img} alt=""></img>
            {/* <div className="ui placeholder">
              <div className="square image"></div>
            </div> */}
          </div>
          <PostInfo
            likes={this.state.likes}
            commentsCount={this.commentsCount}
            likeHandler={this.likeHandler}
            isLiked={this.state.isLiked}
            showComments={this.showComments}
          />

          <Comments
            messageEnd={this.messagesEnd}
            comments={this.state.comments}
            isExpanded={this.state.commentsExpanded}
            hideComment={this.hideComment}
          />
          <CommentInput
            loggedin={this.props.loggedin.user}
            addCommentHandler={this.addCommentDecorator}
          />
        </div>
      </div>
    );
  }
}

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.commentEnd = {};
  }
  componentDidUpdate() {
    if (this.commentEnd) {
      this.commentEnd.scrollTop = this.commentEnd.scrollHeight;
    }
  }
  render() {
    if (!this.props.comments.length || !this.props.isExpanded)
      return <div className="empty-comments"></div>;

    let commentsArr = this.props.comments.map((val, i) => {
      return (
        <Comment data={val}></Comment>
        // <div className="comment" key={i}>
        //   <div className="user-avatar">
        //     <img src={val.avatar} alt="author avatar"></img>
        //   </div>
        //   <div className="user-data">
        //     <div className="username">{val.name}</div>

        //     <div className="comment-text">{val.text}</div>
        //   </div>
        // </div>
      );
    });

    let hideButton = (
      <div className="hide-comments-button">
        <div onClick={this.props.hideComment}>Hide comments</div>
      </div>
    );

    return (
      <div className="comments-container">
        {this.props.isExpanded ? hideButton : ""}
        <div
          className="comments-wrapper ui threaded comments"
          ref={(el) => {
            this.commentEnd = el;
          }}
        >
          {commentsArr}
        </div>
      </div>
    );
  }
}

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isliked: false,
      data: props.data,
    };
  }
  handleLike(e) {
    // console.log(e);
  }
  render() {
    let val = this.state.data;
    return (
      <div className="comment">
        <a className="avatar" href="/">
          <img alt="" src={val.author.photo} />
        </a>
        <div className="content">
          <a href="/" className="author">
            {val.author.fname + " " + val.author.lname}
          </a>
          <div className="metadata">
            <span className="date">Today at 5:42PM hardcoded</span>
          </div>
          <div className="text">{val.text}</div>
          <div className="actions">
            <button onClick={this.handleLike} className="reply">
              Like
            </button>
          </div>
        </div>
      </div>
    );
  }
}

class UserInfo extends React.Component {
  render() {
    return (
      <div className="user-info">
        <div className="user-avatar">
          <img src={this.props.userAvatar} alt="author"></img>
        </div>

        <div className="user-data">
          <Link to={"/profile/" + this.props.email.split("@")[0]}>
            <div className="username">{this.props.username}</div>
          </Link>

          <div className="post-date">
            <Moment fromNow>{this.props.date}</Moment>

          </div>
        </div>
      </div>
    );
  }
}

class PostInfo extends React.Component {
  render() {
    let likeIconStyle = this.props.isLiked ? "fas" : "far";
    return (
      <div className="post-info">
        <div className="likes" onClick={this.props.likeHandler}>
          <span>
            <div className="icon">
              <i className={`${likeIconStyle} fa-heart`}></i>
            </div>
            <div className="count">{this.props.likes}</div>
          </span>
        </div>
        <div className="comments" onClick={this.props.showComments}>
          <span>
            <div className="icon">
              <i className="far fa-comment-alt"></i>
            </div>
            <div className="count">{this.props.commentsCount}</div>
          </span>
        </div>
        <div className="views">
          <span>
            <div className="icon">
              <i className="fas fa-share"></i>
            </div>
          </span>
        </div>
      </div>
    );
  }
}

class CommentInput extends React.Component {
  render() {
    return (
      <div className="comment-input">
        <div className="user-avatar">
          <img src={this.props.loggedin.photo} alt="user avatar"></img>
        </div>
        <form onSubmit={this.props.addCommentHandler}>
          <input
            name="text"
            type="text"
            maxLength="200"
            placeholder="Write you comment here"
          ></input>
          <button className="submit-button" type="submit"></button>
        </form>
      </div>
    );
  }
}

connect(() => { }, { addPost })(Post);
export default connect(() => { }, { addPost, updateLikeActivity, updateUnLikeActivity, updateCommentActivity })(Application);