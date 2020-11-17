import React, { Component } from 'react';
import Navbar from '../containers/Navbar'
import PostList from '../containers/Community/PostList'


class Community extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div id="community">
                <Navbar />
                <div className="container" id="communityPage">
                    <div className="row">
                        <div className="col-12 col-lg-9">
                            <div className="newPost ui segment">
                                <div className="new">
                                    <i class="fas fa-edit mr-2"></i>
                                    Create New Post
                                </div>

                                <div className="upload">
                                    <div className="media">
                                        <i className="fas fa-images"></i>
                                        <span>Photo</span>
                                    </div>

                                    <div className="media">
                                        <i class="fas fa-photo-video"></i>
                                        <span>Video</span>
                                    </div>
                                </div>

                            </div>
                            <PostList />
                        </div>
                        <div className="col-12 col-lg-3">
                            <div className="recommended ui segment">
                                <h1>Recommended</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Community;