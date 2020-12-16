import React from "react";
import Navbar from "../containers/Global/Navbar";
import PageFooter from "../containers/Global/PageFooter";
import { apiCall } from "../services/api";
import Modal from 'react-bootstrap/Modal'

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
        <Navbar isMobile={this.state.isMobile} {...this.props} />
        <Feed
          isMobile={this.state.isMobile}
          currentUser={this.props.currentUser}
        />
        <ScrollTopButton />
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
    console.log(`resize`);
    if (this.isThrottled === undefined) this.isThrottled = false;
    if (this.isQueueEmpty === undefined) this.isQueueEmpty = true;

    if (!this.isThrottled) {
      this.isThrottled = true;
      this.setState({
        styles: {
          position: "fixed",
          top: "4.4rem",
          left: `${
            document.querySelector(".feed-wrapper").getBoundingClientRect()
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
        left: `${
          document.querySelector(".feed-wrapper").getBoundingClientRect().left -
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
    this.state = { show: false ,postdata:{
      content:''
    } };
    this.handleChange=(e)=>{
      this.state.postdata[e.target.name]=e.target.val
      this.setState({...this.state})
    }
    this.handleSubmit=(e)=>{
      //api call
    }
    this.handleClose=(e)=>{
      this.setState({show:false})
    }
    this.handleShow=(e)=>{
      this.setState({show:true})
    }
  }
  render() {
    const {content} = this.state.postdata
    return (
      <div class="posting-area">
        <div onClick={this.handleShow} class="posting-text" >start post</div>
        <div class="posting-but">
          <div class="posting-but1" onClick="">
            <i class="material-icons">insert_photo</i>Photo
          </div>
          <div class="posting-but2" onClick="">
            <i class="material-icons">videocam</i>Video
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
                    val={content}
                    onChange={this.handleChange}
                  ></textarea>
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
    this.changePostsCount = this.changePostsCount.bind(this);
  }

  componentDidMount() {
    document.addEventListener("scroll", this.fixedScrollHandler);
  }

  changePostsCount(current, total) {
    this.setState({ postsOnScreen: current, totalPosts: total });
  }

  render() {
    return (
      <div id="feed">
        <div className="content-wrapper feed-wrapper">
          <PostWall
            url="/api/community/posts/getAll"
            postcreate={true}
            currentUser={this.props.currentUser}
          />
          <div className="right-side">
            <div className="controls">tags and recommended post</div>
          </div>
        </div>
      </div>
    );
  }
}

export class PostWall extends React.Component {
  constructor(props) {
    super(props);
    console.log("this tbh", this.props.currentUser.user);
    this.state = {
      start: true,
      loggedin: this.props.currentUser.user,
      localList: {},
    };
  }

  getPostById(id) {
    if (!this.state.localList[id]) return;
    return (
      <Post
        id={id}
        key={id}
        loggedin={this.state.loggedin}
        options={this.state.localList[id]}
      />
    );
  }

  renderAll() {
    let elem = [];
    for (let key in this.state.localList) {
      elem.unshift(this.getPostById(key));
    }
    if (!elem.length) {
      if (this.state.start) elem.push(<div></div>);
      else
        elem.push(
          <div className="message" key={-2}>
            <div className="text-message">No posts available</div>
          </div>
        );
    }
    return elem;
  }

  componentDidMount() {
    apiCall("get", this.props.url, "")
      .then((data) => {
        this.setState({ ...this.state, localList: data, start: false });
        // console.log(this.state.localList);
      })
      .catch((e) => {
        this.setState({ ...this.state, start: false });
      });
  }

  render() {
    let content;
    content = this.renderAll();

    return (
      <div className="post-wall">
        {this.props.postcreate && <PostCreate />}
        {content}
      </div>
    );
  }
}

class Post extends React.Component {
  constructor(props) {
    super(props);
    let options = props.options;
    // console.log(options.comments)
    this.state = {
      commentsExpanded: false,
      likes: options.likedBy.length,
      isLiked: options.likedBy.includes(props.loggedin._id),
      comments: options.comments,
      imageLoaded: false,
    };
    this.id = options._id;
    this.content = options.content;
    this.avatar = options.author.photo;
    this.name = options.author.fname + options.author.lname;
    this.email=options.author.email
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
  // assignMessageEnd(el) {
  //   console.log(el);
  //   el.preventDefault();
  //   this.messagesEnd = el;
  // }
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
      button.classList.toggle("liked");
      lik++;
      apiCall("post", "/api/community/posts/like/" + this.id, {
        id: this.props.loggedin._id,
      })
        .then((data) => console.log(data))
        .catch((e) => console.log(e));
    } else {
      button.classList.toggle("liked");
      lik--;
      apiCall("put", "/api/community/posts/like/" + this.id, {
        id: this.props.loggedin._id,
      })
        .then((data) => console.log(data))
        .catch((e) => console.log(e));
    }
    this.setState({ ...this.state, isLiked: !this.state.isLiked, likes: lik });
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
      id: this.props.loggedin._id,
      text: commentText,
    });
    this.state.comments.push({
      author: {
        fname: this.props.loggedin.fname,
        lname: this.props.loggedin.lname,
        photo: this.props.loggedin.photo,
      },
      text: commentText,
    });
    form.text.value = "";
    this.setState({ ...this.state, commentsExpanded: true }); //vedant kya karta hai
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
            {/* <div class="ui placeholder">
              <div class="square image"></div>
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
            loggedin={this.props.loggedin}
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
        <div href="#" onClick={this.props.hideComment}>
          Hide comments
        </div>
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
    console.log(e);
  }
  render() {
    let val = this.state.data;
    // console.log(val);
    return (
      <div class="comment">
        <a class="avatar" href="/">
          <img alt="" src={val.author.photo} />
        </a>
        <div class="content">
          <a href="/" class="author">
            {val.author.fname + " " + val.author.lname}
          </a>
          <div class="metadata">
            <span class="date">Today at 5:42PM</span>
          </div>
          <div class="text">{val.text}</div>
          <div class="actions">
            <button onClick={this.handleLike} class="reply">
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
          <a href={"./profile/" + this.props.email.split("@")[0]}>
            <div className="username">{this.props.username}</div>
            </a>
            <div className="post-date">{this.props.date}</div>
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

export default Application;
