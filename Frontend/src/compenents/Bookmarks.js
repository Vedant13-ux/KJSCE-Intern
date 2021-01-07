import React, { Component } from 'react'
import { apiCall } from '../services/api'
import Internship from '../containers/Homepage/Intership'
import Navbar from '../containers/Global/Navbar'
import PageFooter from '../containers/Global/PageFooter'
import Loading from '../images/Loading'
import NoBookmarks from '../images/NoBookmarks'

class Bookmarks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookmarks: [],
            start: true,
        }
    }
    componentDidMount() {
        document.documentElement.scrollTop = 0;
        apiCall('get', '/api/internship/bookmarks/' + this.props.currentUser.user._id, '')
            .then(async bookmarks => {
                this.setState({ bookmarks, start: false });
                console.log(bookmarks)
            })
            .catch(err => {
                console.log(err);
            })
    }
    render() {
        return (
            <div>
                <Navbar history={this.props.history} onPage="bookmarks"></Navbar>
                {this.state.start &&
                    <div className="loading-anime">
                        <Loading className="loading-wheel" />
                    </div>
                }
                {this.state.bookmarks.length === 0 &&
                    <NoBookmarks />
                }
                {
                    (!this.state.start && this.state.bookmarks.length !== 0) &&
                    <div id="bookmarks">
                        <div className="row">
                            {
                                this.state.bookmarks.map((internship) => {
                                    return (
                                        <Internship
                                            userId={this.props.currentUser.user._id}
                                            key={internship._id}
                                            {...internship}
                                            bookmarked={true}
                                        ></Internship>
                                    );
                                })}
                        </div>
                    </div>
                }
                <PageFooter />
            </div >

        )
    }
}

export default Bookmarks;