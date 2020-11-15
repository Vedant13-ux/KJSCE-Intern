import React, { Component } from "react";
import Skill from './../containers/skills'

class Intershipform extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      skills: [""],
      duration: "",
      applyBy: "",
      noo: "",
      OtherReq: "",
      Department: "",
      perks: "",
      whocanApply: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    return this.setState({ [e.target.name]: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    //to do
  }

  render() {
    const {
      title,
      Department,
      applyBy,
      duration,
      skills,
      noo,
      OtherReq,
      perks,
      whocanApply,
    } = this.state;
    return (
      <div>
        <form className="ui form" onSubmit={this.handleSubmit}>
          <div class="ui form">
            <div class="field">
              <label>Title</label>
              <input
                name="title"
                val={title}
                onChange={this.handleChange}
                type="text"
              ></input>
            </div>
          </div>
          <div class="two fields">
            <div class="field">
              <label>Department</label>
              <select
                name="Department"
                val={Department}
                onChange={this.handleChange}
              >
                <option value="">Department</option>
                <option value="4">IT</option>
                <option value="3">Comps</option>
                <option value="2">EXTC</option>
                <option value="1">ETC</option>
                <option value="0">Mech</option>
              </select>
            </div>

            <div class="field">
              <label>Apply By</label>
              <input
                type="Date"
                name="applyBy"
                val={applyBy}
                onChange={this.handleChange}
              ></input>
            </div>
          </div>
          <div class="two fields">
            <div class="field">
              <label>Duration</label>
              <input
                type="text"
                name="duration"
                val={duration}
                onChange={this.handleChange}
              ></input>
            </div>
            <div class="field">
              <label>Number of opening</label>
              <input
                type="text"
                name="noo"
                val={noo}
                onChange={this.handleChange}
              ></input>
            </div>
          </div>
          <Skill></Skill>
          <div class="field">
            <label>Who can Apply</label>
            <textarea
              rows="2"
              name="whocanApply"
              val={whocanApply}
              onChange={this.handleChange}
            ></textarea>
          </div>
          <div class="field">
            <label>Other Requirements</label>
            <textarea
              rows="2"
              name="OtherReq"
              val={OtherReq}
              onChange={this.handleChange}
            ></textarea>
          </div>
          <div class="field">
            <label>perks</label>
            <textarea
              rows="2"
              name="perks"
              val={perks}
              onChange={this.handleChange}
            ></textarea>
          </div>
          <div className="submit">
            <button class="big ui button">ADD</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Intershipform;
