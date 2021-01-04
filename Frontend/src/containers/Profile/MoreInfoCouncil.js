import React, { Component } from 'react';
import { connect } from 'react-redux'
import Modal from "react-bootstrap/Modal";
import { Link } from 'react-router-dom';
import { apiCall } from '../../services/api'
import { addMember, deleteMember } from '../../store/actions/user'



class MoreInfoCouncil extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            position: '',
            memberEmail: '',
            suggestedMembers: [],
            selectedMember: {},
            inputValue: ""
        }
        this.handleChange = (e) => {
            this.setState({ [e.target.name]: e.target.value });
        }
        this.handleSubmit = (e) => {
            e.preventDefault();
            const member = {
                member: this.state.selectedMember,
                position: this.state.position
            }
            console.log(member);
            console.log('Add Member ma aya');
            props.addMember(member, props.user._id)
                .then(async () => {
                    await this.setState({ selectedMember: {}, position: '', inputValue: '' });
                    this.handleClose();
                }).catch((err) => {
                    console.log(err);
                });
        }
        this.filterFunction = (e) => {
            e.preventDefault();
            console.log('filter ma aaya');
            var filter;
            filter = e.target.value;

            if (filter === "") {
                return this.setState({ suggestedMembers: [] })
            }
            apiCall('get', '/api/council/findMembers/' + filter, '')
                .then(async (users) => {
                    await this.setState({ suggestedMembers: users });
                }).catch((err) => {
                    console.log(err);
                });
        }
        this.selectMember = async (member) => {
            console.log(member);
            await this.setState({ selectedMember: member, suggestedMembers: [], inputValue: `${member.fname} ${member.lname}` });
            console.log(this.state.selectedMember);
        }

        this.handleClose = () => this.setState({ show: false, suggestedMembers: [] });
        this.handleShow = () => this.setState({ show: true });

    }
    render() {
        const { position, memberEmail } = this.state;
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
                            {this.props.user.members.map(member => (
                                <div className="eachMember">
                                    <div className="row">
                                        <div className="col-8">
                                            <span className="details">
                                                <img className="avatar-pro mr-2" src={member.member.photo} alt="member"></img>
                                                <Link to={"/profile/" + member.member.email.split('@')[0]}>{member.member.fname} {member.member.lname}</Link>
                                            </span>
                                        </div>
                                        <div className="col-4">
                                            <span className="position">{member.position}</span>
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
                            <form onSubmit={this.handleSubmit} autoComplete="off">
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
                                    <div className="field">
                                        <label>Search Member</label>
                                        <div className="dropdown">
                                            <div id="myDropdown" className="dropdown-content">
                                                <input type="search" placeholder="Search.." id="myInput" value={this.state.inputValue} onChange={this.handleChange} onKeyUp={this.filterFunction} name="inputValue" />

                                                {this.state.suggestedMembers.map(member => (
                                                    <div className="suggested" onClick={this.selectMember.bind(this, member)}>
                                                        <img src={member.photo} alt="user"></img>
                                                        <span to="#">{member.fname} {member.lname}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        {!!Object.keys(this.state.selectedMember) &&
                                            <span className="applicant">
                                                <img src={this.state.selectedMember.photo} alt=""></img>
                                                <span className="name">{this.state.selectedMember.fname} {this.state.selectedMember.lname}</span>
                                            </span>
                                        }
                                    </div>

                                    <div className="submit confirmdiv">
                                        <button type="submit" className="medium ui button confirm" onClick={this.handleSubmit}>Add Member</button>
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

export default connect(() => { }, { addMember, deleteMember })(MoreInfoCouncil);