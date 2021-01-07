import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { apiCall } from '../../services/api'

class UserSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            suggested: []
        };
        this.filterFunction = (e) => {
            e.preventDefault();
            console.log("filter ma aaya");
            var filter;
            filter = e.target.value;

            if (filter === "") {
                return this.setState({ suggested: [] });
            }
            apiCall("get", "/api/suggestUsers/" + filter, "")
                .then(async (users) => {
                    await this.setState({ suggestedMembers: users });
                })
                .catch((err) => {
                    console.log(err);
                });
        };
    }

    render() {
        return (
            <div id="userSearch">
                <div className="dropdown">
                    <div id="myDropdown" className="dropdown-content">
                        <input
                            type="search"
                            placeholder="Search.."
                            id="myInput"
                            value={this.state.inputValue}
                            onChange={this.handleChange}
                            onKeyUp={this.filterFunction}
                            name="inputValue"
                        />

                        {this.state.suggested.map((user) => (
                            <Link
                                className="suggested"
                            >
                                <img src={user.photo} alt="user"></img>
                                <span to="#">
                                    {user.fname} {user.lname}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default UserSearch
