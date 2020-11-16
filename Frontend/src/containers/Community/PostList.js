import React, { Component } from 'react';
import Post from './Post'
import { apiCall } from '../../services/api'


class Community extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        };
    }
    componentDidMount() {
        let url = 'http://localhost:3001/api/community/posts/getAll'
        apiCall('get', url, '')
            .then(posts => {
                console.log(posts)
                return this.setState({ posts })
            })
            .catch(err => console.log(err))
    }
    render() {
        return (
            <div className="post">
                {this.state.posts.map(post => (
                    <div class="d-block">
                        <Post key={post._id} {...post}></Post>
                    </div>
                ))}
            </div>
        )
    }

}

export default Community;