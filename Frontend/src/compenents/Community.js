import React from "react";
import Navbar from "../containers/Navbar";
import PageFooter from "../containers/PageFooter";

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
    this.state = {};
  }
  render() {
    return (
      <div class="posting-area">
        <input class="posting-text" placeholder="start post"></input>
        <div class="posting-but">
          <div class="posting-but1" onClick=""><i class="material-icons">insert_photo</i>Photo</div>
          <div class="posting-but2" onClick=""><i class="material-icons">videocam</i>Video</div>
        </div>
      </div>
    )
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
            <div className="controls">
              tags and recommended post
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class PostObj {
  constructor(options) {
    this.postList = options.list;
    this.updateParentState = options.update;
    this.id = options.id;
    this.avatar = options.avatar;
    this.name = options.name;
    let dateNow = new Date();
    this.date = `${dateNow.toLocaleString("en", {
      day: "2-digit",
    })} ${dateNow.toLocaleString("en", {
      month: "short",
    })} at ${dateNow.toLocaleString("ru", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })}`;
    this.img = options.img;
    this.likes = 0;
    this.isLiked = false;
    this.comments = [];
    this.isExpanded = false;

    //imported methods
    this.likeHandler = this.likeHandler.bind(this);
    this.addCommentHandler = this.addCommentHandler.bind(this);
  }

  get commentsCount() {
    return this.comments.length;
  }

  likeHandler(e) {
    e.preventDefault();
    let button = e.target.closest(".likes");
    if (!this.isLiked) {
      button.classList.toggle("liked");
      this.likes++;
    } else {
      button.classList.toggle("liked");
      this.likes--;
    }
    this.isLiked = !this.isLiked;
    this.updateParentState();
  }

  addCommentHandler(e) {
    e.preventDefault();
    let form = e.target;
    let commentText = form.text.value.trim();
    if (!commentText.length) {
      form.text.value = "";
      return;
    }
    this.comments.push({
      name: 'huzaifa',
      avatar:
        "https://justmonk.github.io/react-news-feed-spa-demo/img/user-avatar.jpg",
      text: commentText,
      type: "user",
    });
    form.text.value = "";
    this.updateParentState();
  }
}

class PostWall extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      postList: {},
    };
    this.localList = {};

  }


  getPostById(id) {
    if (!this.localList[id]) return;
    return <Post id={id} key={id} args={this.state.postList[id]} />;
  }

  renderAll() {
    let elem = [];
    for (let key in this.state.postList) {
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
    let postObject = new PostObj({
      list: this.localList,
      update: this.updateState,
      id: this.idCounter,
      avatar:
        "https://justmonk.github.io/react-news-feed-spa-demo/img/user-avatar.jpg",
      name: "huzaifa",
      img:
        "https://justmonk.github.io/react-news-feed-spa-demo/img/blur-min.jpg",
    });
    let postObject2 = new PostObj({
      list: this.localList,
      update: this.updateState,
      id: this.idCounter,
      avatar:
        "https://justmonk.github.io/react-news-feed-spa-demo/img/user-avatar.jpg",
      name: "vedant",
      img:
        "https://justmonk.github.io/react-news-feed-spa-demo/img/blur-min.jpg",
    });

    this.localList[this.idCounter] = postObject;
    this.idCounter++;
    this.localList[this.idCounter] = postObject2;
    this.idCounter++;

  }
  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  render() {
    let content;
    content = this.renderAll();

    return <div className="post-wall">
      <PostCreate />
      {content}</div>;
  }
}

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = { commentsExpanded: true };
    this.showComments = this.showComments.bind(this);
    this.hideComment = this.hideComment.bind(this);
    this.addCommentDecorator = this.addCommentDecorator.bind(this);
  }

  showComments(e) {
    e.preventDefault();
    this.setState({ commentsExpanded: true });
  }
  hideComment(e) {
    e.preventDefault();
    this.setState({ commentsExpanded: false });
  }

  addCommentDecorator(e) {
    e.preventDefault();
    this.showComments(e);
    this.props.args.addCommentHandler(e);
  }

  render() {
    return (
      <div className="post" id={this.props.id}>
        <div className="post-wrapper">
          <UserInfo
            userAvatar={this.props.args.avatar}
            date={this.props.args.date}
            username={this.props.args.name}
          />
          <div className="post-content">
            <img src={this.props.args.img} alt=""></img>
          </div>
          <PostInfo
            likes={this.props.args.likes}
            views={this.props.args.views}
            commentsCount={this.props.args.commentsCount}
            likeHandler={this.props.args.likeHandler}
            isLiked={this.props.args.isLiked}
            showComments={this.showComments}
          />
          <Comments
            comments={this.props.args.comments}
            isExpanded={this.state.commentsExpanded}
            hideComment={this.hideComment}
          />
          <CommentInput addCommentHandler={this.addCommentDecorator} />
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
            <div className="username">
              {val.name}
            </div>

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
          <img
            src="https://justmonk.github.io/react-news-feed-spa-demo/img/user-avatar.jpg"
            alt="user avatar"
          ></img>
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
