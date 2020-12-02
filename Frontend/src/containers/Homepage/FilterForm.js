import React, { Component } from "react";
import { Multiselect } from "multiselect-react-dropdown";
import { apiCall } from "../../services/api";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import { MContext } from "../../services/Provider";

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
            value: {
                min: 3,
                max: 7,
            },
            isHomeChecked: true,
            isExternalChecked: true,
            error: ''
        };
        this.handleSkills = this.handleSkills.bind(this);
        this.multiselectRef = React.createRef();
        this.toggleHome = this.toggleHome.bind(this);
        this.toggleExternal = this.toggleExternal.bind(this);
    }
    toggleHome(e) {
        this.setState({ isHomeChecked: !this.state.isHomeChecked });
    }
    toggleExternal(e) {
        this.setState({ isExternalChecked: !this.state.isExternalChecked });
    }
    async handleSkills() {
        await this.setState({ error: '' })
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
            <MContext.Consumer>
                {(context) => (
                    <div className="filterForm">
                        <label className="labelFilter">By Skills</label>
                        <Multiselect
                            options={this.state.skills} // Options to display in the dropdown
                            selectedValues={this.state.skillsRequired} // Preselected value to persist in dropdown
                            displayValue="text" // Property name to display in the dropdown options
                            onSearch={this.handleSkills}
                            ref={this.multiselectRef}
                        />
                        <div className="intType">
                            <label className="labelFilter">Type</label>
                            <div className="checkbox">
                                <input type="checkbox" value="Work From Home" checked={this.state.isHomeChecked} onChange={this.toggleHome} />
                                <label>Work From Home</label>
                            </div>
                            <div className="checkbox">
                                <input type="checkbox" value="External" checked={this.state.isExternalChecked} onChange={this.toggleExternal} />
                                <label>External</label>
                            </div>
                        </div>
                        <label className="labelFilter">Duration (in Months)</label>
                        <InputRange
                            draggableTrack
                            maxValue={12}
                            minValue={1}
                            onChange={value => this.setState({ value: value })}
                            onChangeComplete={value => console.log(value)}
                            value={this.state.value} />

                        <button type="button" class="btn btn-default" onClick={async (e) => {
                            var skills = this.multiselectRef.current.getSelectedItems();
                            if (skills.length === 0) {
                                return await this.setState({ error: 'Skills can\'t be empty.' })
                            } else if (this.state.isExternalChecked === false && this.state.isHomeChecked === false) {
                                return await this.setState({ error: 'Select atleast one type.' })
                            }

                            else {
                                await this.setState({ error: '' })
                                var skillArray = [];
                                skills.forEach((skill) => {
                                    skillArray.push(skill["text"]);
                                });
                                let type = [];
                                if (this.state.isHomeChecked) type.push("Work from Home")
                                if (this.state.isExternalChecked) type.push("External")
                                let obj = {
                                    type: type,
                                    min: this.state.value.min,
                                    max: this.state.value.max,
                                    skills: skillArray,
                                }
                                context.filter(obj)
                                // this.props.onHide();
                            }
                        }}>
                            Apply Filters
                        </button>
                        <p style={{ color: 'red' }}>{this.state.error}</p>
                    </div>
                )}
            </MContext.Consumer>
        );
    }
}

export default FilterForm;
