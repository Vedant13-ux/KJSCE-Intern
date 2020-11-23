import React from "react";
import Navbar from "../containers/Global/Navbar";
import PageFooter from "../containers/Global/PageFooter";
import { apiCall } from "../services/api";

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
        <Navbar isMobile={this.state.isMobile} />
        <Feed isMobile={this.state.isMobile} />
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
    this.state = {};
  }
  render() {
    return (
      <div class="posting-area">
        <input class="posting-text" placeholder="start post"></input>
        <div class="posting-but">
          <div class="posting-but1" onClick="">
            <i class="material-icons">insert_photo</i>Photo
          </div>
          <div class="posting-but2" onClick="">
            <i class="material-icons">videocam</i>Video
          </div>
        </div>
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
          <PostWall />
          <div className="right-side">
            <div className="controls">tags and recommended post</div>
          </div>
        </div>
      </div>
    );
  }
}

class PostWall extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      postList: {},
      loggedin:{
        name:'mai hu',
        avatar:'https://i.redd.it/1y3vw360an031.png'
      },
      localList:{}
    };
  }

  getPostById(id) {
    if (!this.state.localList[id]) return;
    return <Post id={id} key={id} loggedin={this.state.loggedin} options={this.state.localList[id]} />;
  }

  renderAll() {
    let elem = [];
    for (let key in this.state.localList) {
      elem.unshift(this.getPostById(key));
    }
    if (!elem.length)
      elem.push(
        <div className="message" key={-2}>
          <div className="text-message">No posts available</div>
        </div>
      );
    return elem;
  }

  componentDidMount() {
    // let postObject = {
    //   id: this.idCounter,
    //   avatar:
    //     "https://justmonk.github.io/react-news-feed-spa-demo/img/user-avatar.jpg",
    //   name: "huzaifa",
    //   content:"me and my bois trying node",
    //   date: new Date(),
    //   img:
    //     "https://justmonk.github.io/react-news-feed-spa-demo/img/blur-min.jpg",
    // };
    apiCall('get', '/api/community/posts/getAll','')
      .then((data)=>{
        this.setState({...this.state,localList:data});
        console.log(this.state.localList)
      })
  }
  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  render() {
    let content;
    content = this.renderAll();

    return (
      <div className="post-wall">
        <PostCreate />
        {content}
      </div>
    );
  }
}

class Post extends React.Component {
  constructor(props) {
    super(props);
    let options = props.options;
    this.state = {
      commentsExpanded: true,
      likes: 0,
      isLiked: false,
      comments: [],
    };
    this.id = options._id;
    this.content=options.content;
    this.avatar = options.author.photo;
    this.name = options.author.fname+options.author.lname;
    let da=options.created
    dateFormat(k) {
      let apply = new Date(k);
      return apply.toDateString();
    }
    this.date = dateFormat(this.created);
    this.img = options.img;
    this.likeHandler = this.likeHandler.bind(this);
    this.addCommentHandler = this.addCommentHandler.bind(this);

    this.showComments = this.showComments.bind(this);
    this.hideComment = this.hideComment.bind(this);
    this.addCommentDecorator = this.addCommentDecorator.bind(this);
  }
  
  get commentsCount() {
    return this.state.comments.length;
  }
  likeHandler(e) {
    e.preventDefault();
    let button = e.target.closest(".likes");
    let lik=this.state.likes;
    if (!this.state.isLiked) {
      button.classList.toggle("liked");
      lik++;
    } else {
      button.classList.toggle("liked");
      lik--;
    }
    this.setState({...this.state,isLiked:!this.state.isLiked,likes:lik});
  }

  addCommentHandler(e) {
    e.preventDefault();
    let form = e.target;
    let commentText = form.text.value.trim();
    if (!commentText.length) {
      form.text.value = "";
      return;
    }
    this.state.comments.push({
      name: this.props.loggedin.name,
      avatar: this.props.loggedin.avatar,
      text: commentText,
      type: "user",
    });
    form.text.value = "";
    this.setState({...this.state});
  }

  showComments(e) {
    e.preventDefault();
    this.setState({...this.state,commentsExpanded:true});
  }
  hideComment(e) {
    e.preventDefault();
    this.setState({...this.state,commentsExpanded:false});
  }

  addCommentDecorator(e) {
    e.preventDefault();
    this.showComments(e);
    this.addCommentHandler(e);
  }

  render() {
    return (
      <div className="post" id={this.id}>
        <div className="post-wrapper">
          <UserInfo
            userAvatar={this.avatar}
            date={this.date}
            username={this.name}
          />
          <div className="post-content">
            <p>{this.content}</p>
            <img src={this.img} alt=""></img>
          </div>
          <PostInfo
            likes={this.state.likes}
            commentsCount={this.commentsCount}
            likeHandler={this.likeHandler}
            isLiked={this.state.isLiked}
            showComments={this.showComments}
          />
          <Comments
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
  render() {
    if (!this.props.comments.length || !this.props.isExpanded)
      return <div className="empty-comments"></div>;

    let commentsArr = this.props.comments.map((val, i) => {
      return (
        <div className="comment" key={i}>
          <div className="user-avatar">
            <img src={val.avatar} alt="author avatar"></img>
          </div>
          <div className="user-data">
            <div className="username">{val.name}</div>

            <div className="comment-text">{val.text}</div>
          </div>
        </div>
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
        <div className="comments-wrapper">{commentsArr}</div>
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
          <div className="username">{this.props.username}</div>

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
          <img src={this.props.loggedin.avatar} alt="user avatar"></img>
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
