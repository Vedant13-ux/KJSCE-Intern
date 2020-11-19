import React from "react";
// import { MultiSelectComponent } from "@syncfusion/ej2-react-dropdowns";
import { Multiselect } from 'multiselect-react-dropdown';
import { SampleBase } from "./../containers/SampleBase";
import { apiCall } from "../services/api";
import { Redirect } from 'react-router-dom';
import skills from '../services/skills.json'


class Intershipform extends SampleBase {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      skillsRequired: [],
      duration: "",
      applyBy: "",
      numberOpenings: "",
      otherRequirements: "",
      department: "",
      description: "",
      perks: "",
      whoCanApply: "",
      skillData: [{ "text": 'Srigar', "value": 1 }, { "text": 'Sam', "value": 2 }],
      options: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSkills = this.handleSkills.bind(this);
    // this.fields = { text: "text", value: "value" };
    this.data = skills["data"];


  }

  handleChange(e) {
    return this.setState({ [e.target.name]: e.target.value });
  }
  handleSkills() {
    const skillInput = document.querySelector('.searchBox');
    var query = skillInput.value;
    console.log(query);
    apiCall('get', 'http://localhost:3001/api/internship/skillSuggestion/' + query, '')
      .then(data => {
        console.log(data)
        this.setState({ skillData: data });
      })
      .catch(err => console.log(err))
    console.log('Hello');

  }
  async handleSubmit(e) {
    e.preventDefault();
    let skillArray = [];

    const selectSkills = document.querySelectorAll(".e-multi-hidden > option");
    await selectSkills.forEach((skill) => {
      skillArray.push(skill.getAttribute("value"));
    });
    await this.setState({ skillsRequired: skillArray });
    console.log(this.state);
    apiCall("post", 'http://localhost:3001/api/internship/details', this.state).then(
      data => {
        console.log(data);
        < Redirect to={'http://localhost:3000/internship?id=' + data._id} />
      }
    )
  }



  render() {
    const {
      title,
      duration,
      applyBy,
      numberOpenings,
      otherRequirements,
      department,
      description,
      perks,
      whoCanApply,
    } = this.state;
    return (
      <form onSubmit={this.handleSubmit} id="internshipForm">
        <div className="ui form">
          <div class="ui form">
            <div class="field">
              <label>Title</label>
              <input
                name="title"
                maxLength="30"
                required
                val={title}
                onChange={this.handleChange}
                type="text"
                placeholder="eg. Frontend with React"
              ></input>
            </div>
          </div>
          <div class="two fields">
            <div class="field">
              <label>Department</label>
              <select
                name="department"
                required
                val={department}
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
                required
                type="Date"
                name="applyBy"
                val={applyBy}
                onChange={this.handleChange}
              ></input>
            </div>
          </div>
          <div class="two fields">
            <div class="field">
              <label>Duration (in months)</label>
              <input
                type="number"
                min="1"
                required
                name="duration"
                val={duration}
                placeholder="eg. 1"
                onChange={this.handleChange}
              ></input>
            </div>
            <div class="field">
              <label>Number of opening</label>
              <input
                type="number"
                min="1"
                required
                name="numberOpenings"
                placeholder="eg. 2"
                val={numberOpenings}
                onChange={this.handleChange}
              ></input>
            </div>
          </div>
        </div>

        <label className="skillsRequired">Skills Required</label>
        {/* <MultiSelectComponent
          dataSource={this.data}
          fields={this.fields}
          placeholder="eg. python,javascript"
          mode="Box"
          change={this.handleSkills}
        /> */}
        <Multiselect
          options={this.state.skillData} // Options to display in the dropdown
          selectedValues={this.state.skillsRequired} // Preselected value to persist in dropdown
          // onSelect={this.onSelect} // Function will trigger on select event
          // onRemove={this.onRemove} // Function will trigger on remove event
          displayValue="text" // Property name to display in the dropdown options
          onSearch={this.handleSkills}
        />

        <div className="ui form">
          <div class="field">
            <label>Who can Apply</label>
            <textarea
              maxlength="200"
              rows="2"
              required
              placeholder="eg. Only those candidates can apply who have relevant skills and interests and are available for duration of 3 months"
              name="whoCanApply"
              val={whoCanApply}
              onChange={this.handleChange}
            ></textarea>
          </div>
          <div class="field">
            <label>About Internship</label>
            <textarea
              maxlength="200"
              rows="2"
              required
              placeholder="eg. Do daily assigned task and fix issues in github"
              name="description"
              val={description}
              onChange={this.handleChange}
            ></textarea>
          </div>
          <div class="field">
            <label>Other Requirements</label>
            <textarea
              maxlength="200"
              rows="2"
              required
              placeholder="eg. Should have communication and leadership skills"
              name="otherRequirements"
              val={otherRequirements}
              onChange={this.handleChange}
            ></textarea>
          </div>
          <div class="field">
            <label>perks</label>
            <textarea
              maxlength="100"
              rows="2"
              required
              name="perks"
              placeholder="eg. Certificate,Letter of recommendation,Flexible work hours "
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
