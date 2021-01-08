import React, { Component } from "react";
import { Modal } from "react-bootstrap";
// import { connect } from "react-redux";
import NoApplication from "../../images/NoApplication";
import {Link} from 'react-router-dom'

export default class InternshipOffered extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
    this.handleshow = (e) => {
      this.setState({ show: true });
    };
    this.handleclose = () => {
      this.setState({ show: false });
    };
  }
  render() {
    return (
      <div id="experience">
        {this.props.owner && (
          <button
            // onClick={this.handleshow1} can add internship through profile
            className="experience-add ui button "
          >
            Add +{" "}
          </button>
        )}
        <div style={{ overflowY: "auto", maxHeight: "800px" }}>
          {this.props.user.internshipsOffered.map((e, i) => {
            return (
              <div className="experience-ele">
                <h4>{e.title}</h4>
                  <sub>{e.category}</sub>
                  <p>
                  <h5>{'duration: '+e.duration+' months'}</h5><br></br>
                  <h6>{e.description}</h6>
                  <Link to={"/internship/" + e._id}>
            see internship
          </Link>
          </p>
              </div>
            );
          })}
          {this.props.user.internshipsOffered.length === 0 && (
            <NoApplication></NoApplication>
          )}
        </div>
        <Modal
          size="lg"
          show={this.state.show}
          onHide={this.handleclose}
          backdrop="static"
        >
          <Modal.Header closeButton>
            <Modal.Title>
                bruh
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
              bruh
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
