import React, { Component } from "react";
import { Modal } from "react-bootstrap";
// import { connect } from "react-redux";
import NoApplication from "../../images/NoApplication";
import { Link } from "react-router-dom";
import { Multiselect } from "multiselect-react-dropdown";

export default class InternshipOffered extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      emails: [],
      selected_emails: [],
    };
    this.handleshow2 = (i) => {
      let allmail=[]
      this.props.user.internshipsOffered[i].applicants.forEach((e)=>{
          console.log(e)
          allmail.push({...e,text:e.email})
      })
      let selemail=[]
      this.props.user.internshipsOffered[i].recruited.forEach((e)=>{
          selemail.push({text:e.email})
      })
      this.setState({ show: true,emails:allmail,selected_emails:selemail });
    };
    this.handleclose = () => {
      this.setState({ show: false });
    };
    this.handlesub=()=>{
        // add to recuited 
    }
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
                  <h5>{"duration: " + e.duration + " months"}</h5>
                  <br></br>
                  <h6>{e.description}</h6>
                  <Link to={"/internship/" + e._id}>see internship</Link>
                  {this.props.owner && <button onClick={()=>this.handleshow2(i)} className="ui button ">
                    Select Recruited
                  </button>}
                </p>
              </div>
            );
          })}
          {this.props.user.internshipsOffered.length === 0 && (
            <NoApplication></NoApplication>
          )}
        </div>
        <Modal
          size="md"
          show={this.state.show}
          onHide={this.handleclose}
          backdrop="static"
        >
          <Modal.Header closeButton>
            <Modal.Title>Select Recruited</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Multiselect
              options={this.state.emails}
              selectedValues={this.state.selected_emails}
              displayValue="text"
              ref={this.multiselectRef}
            />
            <div style={{ textAlign: "center", margin: "5px" }}>
              <button onClick={this.handlesub} className="ui button">CONFIRM</button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
