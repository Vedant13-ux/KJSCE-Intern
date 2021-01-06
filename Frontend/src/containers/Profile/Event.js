import React, { Component } from 'react'
import { Modal } from "react-bootstrap";
import { connect } from 'react-redux';
import { addEvent } from '../../store/actions/user'
class Event extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: this.props.user.events,
            show: false
        }
        this.handleshow = () => {
            this.setState({ show: true });
        };
        this.handleclose = () => {
            this.setState({ show: false });
        };
        this.handleAddEvent = (data) => {
            console.log(data);
            this.props.addEvent(data, this.props.user._id).then(
                () => {
                    console.log('Event Added');
                    this.setState({ show: false });
                }
            ).catch((err) => err)
        }
    }
    render() {
        return (
            <div id="experience">
                {this.props.owner && <button onClick={this.handleshow} className="experience-add ui button">Add + </button>}
                <div style={{ overflowY: 'auto', maxHeight: '800px' }}>
                    {this.state.list.map((e, i) => {
                        return (
                            <div className="experience-ele">
                                <h4>{e.title}</h4>
                                <div>
                                    <h7>
                                        Venue : {e.venue}
                                    </h7>
                                </div>
                                <div>
                                    <h7>
                                        Timings : {e.startTime} - {e.endTime}
                                    </h7>
                                </div>
                                <div>
                                    Description : {e.description}
                                </div>
                                <div>
                                    <a href={e.link} target="_blank" rel="noreferrer" >Other Details</a>
                                </div>

                            </div>)
                    })}
                </div>
                <Modal size="lg" show={this.state.show} onHide={this.handleclose} backdrop="static">
                    <Modal.Header closeButton>
                        <Modal.Title>Fill Event Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <EventForm {...this.props} onAddEvent={this.handleAddEvent}></EventForm>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

class EventForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            venue: "",
            startTime: "",
            endTime: "",
            date: {},
            description: "",
            link: ""
        };
        this.handleSubmit = async (e) => {
            e.preventDefault();
            props.onAddEvent({ ...this.state, startTime: this.formatAMPM(this.state.startTime), endTime: this.formatAMPM(this.state.endTime) });
        }
        this.handleChange = (e) => {
            this.setState({ [e.target.name]: e.target.value })
        }
        this.formatAMPM = (date) => {
            date = new Date(date);
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            minutes = minutes < 10 ? '0' + minutes : minutes;
            var strTime = hours + ':' + minutes + ' ' + ampm;
            return strTime;
        }
    }
    render() {
        const {
            title,
            venue,
            startTime,
            endTime,
            date,
            description,
            link
        } = this.state;
        return (
            <form onSubmit={this.handleSubmit} id="internshipForm">
                <div className="ui form">
                    <div className="field">
                        <label>Title</label>
                        <input
                            name="title"
                            maxLength="30"
                            required
                            value={title}
                            onChange={this.handleChange}
                            type="text"
                            placeholder="Eg. Internship Expo"
                        ></input>
                    </div>
                    <div className="field">
                        <label>Venue</label>
                        <input
                            name="venue"
                            maxLength="30"
                            required
                            value={venue}
                            onChange={this.handleChange}
                            type="text"
                            placeholder="Building, Area/Locality, City, State "
                        ></input>
                    </div>
                    <div className="field">
                        <label>Timings</label>
                        <div className="two fields">
                            <div className="field">
                                <input
                                    name="startTime"
                                    required
                                    value={startTime}
                                    onChange={this.handleChange}
                                    type="time"
                                    placeholder="Start Time"
                                ></input>
                            </div>
                            <div className="field">

                                <input
                                    name="endTime"
                                    required
                                    value={endTime}
                                    onChange={this.handleChange}
                                    type="time"
                                    placeholder="End Time"
                                ></input>
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <label>Date</label>
                        <input
                            name="date"
                            required
                            value={date}
                            onChange={this.handleChange}
                            type="date"
                        ></input>
                    </div>
                    <div className="field">
                        <label>Link</label>
                        <input
                            name="link"
                            required
                            value={link}
                            onChange={this.handleChange}
                            type="url"
                            placeholder="eg. https://github.com/Vedan..."
                        ></input>

                    </div>
                    <div className="field">
                        <label>Description</label>
                        <textarea
                            maxlength="200"
                            rows="2"
                            placeholder="Other Details about the Event"
                            name="description"
                            value={description}
                            onChange={this.handleChange}
                        ></textarea>
                    </div>
                    <div className="submit confirmdiv">
                        <button className="medium ui button confirm">ADD</button>
                    </div>
                </div>
            </form>
        );
    }
}


export default connect(() => { }, { addEvent })(Event);
