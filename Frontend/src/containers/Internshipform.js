import React from "react";
import { MultiSelectComponent } from "@syncfusion/ej2-react-dropdowns";
import { SampleBase } from './../containers/SampleBase';


var data = require("./temp.json");

class Intershipform extends SampleBase {
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
    this.temp = 'sportsData';
    this.sportsData = data[this.temp];
    // maps the appropriate column to fields property
    this.fields = { text: 'Game', value: 'Id' };
    console.log(this.sportsData);
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
      <form onSubmit={this.handleSubmit} id="internshipForm">
        <div className="ui form">
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
                <option value="it">IT</option>
                <option value="cs">Comps</option>
                <option value="extc">EXTC</option>
                <option value="etrx">ETRX</option>
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
        </div>

        <label className="skillsRequired">Skills Required</label>
        <MultiSelectComponent
          dataSource={this.sportsData}
          fields={this.fields}
          placeholder="Favorite Sports"
          mode="Box"
        />
        <div className="ui form">
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
        </div>
      </form>
    );
  }
}

export default Intershipform;
