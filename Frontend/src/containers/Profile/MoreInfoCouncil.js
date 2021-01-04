import React, { Component } from 'react';
import { connect } from 'react-redux'
import Modal from "react-bootstrap/Modal";
import { Link } from 'react-router-dom';
import { apiCall } from '../../services/api'



class MoreInfoCouncil extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            position: '',
            memberEmail: '',
            members: [
                {
                    photo: 'https://assets.stickpng.com/images/585e4bf3cb11b227491c339a.png',
                    fname: 'Vedant',
                    lname: 'Nagani',
                    email: 'vedant.nagani@somaiya.edu',
                    roleInCouncil: 'PR'
                },
                {
                    photo: 'https://assets.stickpng.com/images/585e4bf3cb11b227491c339a.png',
                    fname: 'Vedant',
                    lname: 'Nagani',
                    email: 'vedant.nagani@somaiya.edu',
                    roleInCouncil: 'PR'
                }
            ],
            showDropdown: false,
            suggestedMembers: []
        }
        this.handleChange = (e) => {
            this.setState({ [e.target.name]: e.target.value });
        }
        this.handleSubmit = (e) => {
            e.preventDefault();
        }
        this.filterFunction = (e) => {
            e.preventDefault();
            console.log('filter ma aaya');
            var input, filter;
            input = e.target;
            filter = e.target.value;
            console.log(filter);
            apiCall('get', '/api/council/findMembers/' + filter, '')
                .then(async (users) => {
                    await this.setState({ suggestedMembers: users });
                }).catch((err) => {
                    console.log(err);
                });
        }
        this.handleDropdown = () => {
            this.setState({ showDropdown: !this.state.showDropdown });
        }
        this.handleClose = () => this.setState({ show: false, showDropdown: false });
        this.handleShow = () => this.setState({ show: true });

    }
    render() {
        const { position, memberEmail } = this.state;
        var style = {};
        if (this.state.showDropdown) {
            style = { display: "block" }
        } else {
            style = { display: "none" }
        }
        return (
            <div className="col-md-4">
                <div className="panel">
                    <div className="panel-heading">
                        <span className="panel-icon">
                            <i className="fas fa-users"></i>
                        </span>
                        <span className="panel-title">Members</span>
                        {this.props.owner && (
                            <span onClick={this.handleShow} className="add">
                                <i className="far fa-plus-square"></i>
                            </span>
                        )}
                    </div>
                    <div className="panel-body pbn">
                        <div>
                            {this.state.members.map(member => (
                                <div className="eachMember">
                                    <div className="row">
                                        <div className="col-8">
                                            <span className="details">
                                                <img className="avatar-pro mr-2" src={member.photo} alt="member"></img>
                                                <Link to={"/profile/" + member.email.split('@')[0]}>{member.fname} {member.lname}</Link>
                                            </span>
                                        </div>
                                        <div className="col-4">
                                            <span className="position">{member.roleInCouncil}</span>
                                        </div>
                                    </div>
                                    <hr className="short br-lighter"></hr>

                                </div>
                            ))}

                        </div>
                    </div>

                    <Modal
                        show={this.state.show}
                        onHide={this.handleClose}
                        centered
                        backdrop="static"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Add members +</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form onSubmit={this.handleSubmit} id="internshipForm">
                                <div className="ui form">
                                    <div className="field">
                                        <label>Position</label>
                                        <input
                                            name="position"
                                            maxLength="30"
                                            required
                                            val={position}
                                            onChange={this.handleChange}
                                            type="text"
                                            placeholder="Eg. PR, PRO"
                                        ></input>
                                    </div>
                                    <div className="dropdown">
                                        <button type="button" onClick={this.handleDropdown} className="dropbtn">Dropdown</button>
                                        <div id="myDropdown" className="dropdown-content" style={style}>
                                            <input type="text" placeholder="Search.." id="myInput" onKeyUp={this.filterFunction} />
                                            {this.state.suggestedMembers.map(member => (
                                                <Link to="#hello">{member.fname} {member.lname}</Link>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="submit confirmdiv">
                                        <button type="submit" className="medium ui button confirm">Add Member</button>
                                    </div>
                                </div>
                            </form>
                        </Modal.Body>
                    </Modal>
                </div>
            </div >
        )
    }
}

export default connect(() => { }, {})(MoreInfoCouncil);