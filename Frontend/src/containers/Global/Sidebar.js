import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMobile: this.props.isMobile,
            user: this.props.currentUser.user,
            isAuthenticated: this.props.currentUser.isAuthenticated,
        }
        // this.toggleSidebar = (e) => {
        //     this.setState({ isOpen: !this.state.isOpen });
        //     e.target.style.width = window.getComputedStyle(e.target).width === this.state.isOpen ? '0px' : '300px';
        // }
    }
    render() {
        var style = this.props.isOpen ? { width: '300px' } : { width: '0px' };
        console.log(this.props.isOpen);
        return (
            <div id="mySidebar" className="sidebar" style={style}>
                <div id="scrollableSide">
                    <div className="sidebar-brand">
                        <Link to="/">KJSCE Connect</Link>
                    </div>
                    {this.state.isAuthenticated &&
                        <div className="sidebar-header">
                            <div className="user-pic">
                                <img className="img-responsive img-rounded" src={this.state.user.photo} alt="User" />
                            </div>
                            <div className="user-info">
                                <span className="user-name">{this.state.user.fname} {this.state.user.lname}</span>
                                <span className="user-role">Writer</span>
                                <span className="user-status">
                                    <i className="fa fa-circle"></i>
                                    <span>Online</span>
                                </span>
                            </div>
                        </div>
                    }
                    <div className="sidebar-menu">
                        <a href="/home" className="mains">
                            <i className="fas fa-home ic"></i>
                        Home
                        <span className="sr-only">(current)</span>
                        </a>

                        <div className="option" onclick="Sidedrop(this)">
                            <a href className="mains" >
                                <i className="fas fa-pen-nib ic">
                                    <span className="badge badge-primary">5</span>
                                </i>
                            Create Post
                            <i className="carret fas fa-angle-right"></i>
                            </a>
                            <div className="sidebar-dropdown">
                                <a href="/newPost?category=poem">Poem</a>
                                <hr />
                                <a href="/newPost?category=quote">Quote</a>
                                <hr />
                                <a href="/newPost?category=shortStory">Short Story</a>
                                <hr />
                                <a href="/newPost?somethingElse">Something Else..</a>
                                <hr />
                            </div>
                        </div>

                        <div className="option" onclick="Sidedrop(this)">
                            <a href className="mains" >
                                <i className="fas fa-book-reader ic"><span className="badge badge-info">3</span></i>
                            Reader's Corner
                            <i className="carret fas fa-angle-right">

                                </i>
                            </a>
                            <div className="sidebar-dropdown">
                                <a href="/readerSection/#section1">Our Picks</a>
                                <hr />
                                <a href="/readerSection/#section2">Poems</a>
                                <hr />
                                <a href="/readerSection/#section3">Quotes</a>
                                <hr />
                                <a href="/readerSection/#section4">Short Stories</a>
                                <hr />
                            </div>
                        </div>


                        <a href="/chat" className="mains">
                            <i className="fas fa-sticky-note ic">
                                <span className="badge badge-success">11</span>
                            </i>
                        Chat Room
                    </a>

                        <a href="/bookmarks" className="mains">
                            <i className="fas fa-bookmark ic">
                                <span className="badge badge-info">4</span>
                            </i>
                        Bookmarks
                    </a>

                        <a className="mains" href='/bookreviews'>
                            <i className="fas fa-book ic"></i>
                        Book Reviews
                    </a>

                        <a className="mains" href='/bookReviews'>
                            <i className="fas fa-smile ic"></i>

                        Donate
                    </a>
                        <a className="mains" href='/aboutUs'>
                            <i className="fas fa-user-tie ic"></i>

                        About Us
                    </a>

                        <a className="mains" href='/bookReviews'>
                            <i className="far fas fa-address-book ic"></i>
                        Contact Us
                    </a>




                    </div>
                </div>
            </div>

        )
    }
}
export default connect(() => { }, {})(Sidebar);
