import React, { Component } from 'react'
import { apiCall } from '../../services/api'
import { Multiselect } from 'multiselect-react-dropdown';

class UserSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: [{ "fname": 'Python' }, { "fname": 'Node.Js' }, { "fname": 'Django' }, { "fname": 'Javascript' }, { "fname": 'C++' }, { "fname": "React Native" }],
            query: '',

        }
        this.getUserSugg = this.getUserSugg.bind(this);
    }
    getUserSugg() {

        let query = this.state.query;
        apiCall('get', 'http://localhost:3001/api/users/profile/search?name=Vedant' + query, '')
            .then((userData) => {
                console.log(userData)
                this.setState({ userData });
            }).catch((err) => {
                console.log(err);
            });
    }
    handleChange(e) {
        return this.setState({ [e.target.name]: e.target.value });
    }
    render() {
        return (
            <Multiselect
                options={this.state.userData} // Options to display in the dropdown
                selectedValues={this.state.query} // Preselected value to persist in dropdown
                // onSelect={this.onSelect} // Function will trigger on select event
                // onRemove={this.onRemove} // Function will trigger on remove event
                displayValue="fname" // Property name to display in the dropdown options
                onSearch={this.getUserSugg}
                selectionLimit="1"
            // singleSelect="true"
            // ref={this.multiselectRef}
            />
        )
    }

}
export default UserSearch;
