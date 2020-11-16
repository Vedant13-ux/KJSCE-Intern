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
            <div className="community">
                <Navbar />
                {/* <div className="container" id="communityPage">
                    <div className="row">
                        <div className="col-lg-9">
                            <PostList />
                        </div>
                    </div>
                </div> */}
            </div>
        )
    }

}

export default Community;