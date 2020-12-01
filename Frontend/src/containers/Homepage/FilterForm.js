import React, { Component } from "react";
import { Multiselect } from "multiselect-react-dropdown";
import { apiCall } from "../../services/api";
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css'

class FilterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skills: [
        { text: "Python" },
        { text: "Node.Js" },
        { text: "Django" },
        { text: "Javascript" },
        { text: "C++" },
        { text: "React Native" },
      ],
      value :{
        min: 3,
        max: 7,
      }
    };
    this.handleSkills = this.handleSkills.bind(this);
    this.multiselectRef = React.createRef();
  }

  handleSkills() {
    const skillInput = document.querySelector(".searchBox");
    var query = skillInput.value;
    console.log(query);
    apiCall("get", "/api/internship/skillSuggestion/" + query, "")
      .then((data) => {
        console.log(data);
        this.setState({ skills: data });
      })
      .catch((err) => console.log(err));
  }
  render() {
    return (
      <div className="filterForm">
        <label>By Skills</label>
        <Multiselect
          options={this.state.skills} // Options to display in the dropdown
          selectedValues={this.state.skillsRequired} // Preselected value to persist in dropdown
          // onSelect={this.onSelect} // Function will trigger on select event
          // onRemove={this.onRemove} // Function will trigger on remove event
          displayValue="text" // Property name to display in the dropdown options
          onSearch={this.handleSkills}
          ref={this.multiselectRef}
        />
        <div className="intType">
          <label>Type</label>
          <div
            className="toggle-wrap"
            title="Automatically append new posts in your feed"
          >
            <input id="autoUpdate" type="checkbox" defaultChecked></input>
            <label htmlFor="autoUpdate">
              <div className="toggle">
                <div className="round"></div>
              </div>
              Work From Home
            </label>
          </div>
          <div
            className="toggle-wrap"
            title="Automatically append new posts in your feed"
          >
            <input id="autoUpdate" type="checkbox" defaultChecked></input>
            <label htmlFor="autoUpdate">
              <div className="toggle">
                <div className="round"></div>
              </div>
              External
            </label>
          </div>
        </div>
        <InputRange
        // formatLabel={value => `${value}months`}
        maxValue={20}
        minValue={0}
        value={this.state.value}
        onChange={value => this.setState({ ...this.state,  value })} />

        <button type="button" class="btn btn-default">
          Apply Filters
        </button>
      </div>
    );
  }
}

export default FilterForm;
