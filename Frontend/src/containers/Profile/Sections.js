import React, { Component } from 'react'

export class Experience extends Component{
    constructor(props){
        super(props)

    }
    render(){
        return (<div></div>)
    }
}

export class ExperienceForm extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return (<form onSubmit={this.handleSubmit} id="internshipForm">
              <div className="ui form">
                <div className="field">
                  <label>Title</label>
                  <input
                    name="title"
                    maxLength="30"
                    required
                    // val={title}
                    onChange={this.handleChange}
                    type="text"
                    placeholder="eg. Retail sales manager"
                  ></input>
                </div>
                {//employement type
                //company
                //checkbox currently working
                //start date end date
                //description
            }
                <div className="field">
                  <label>Issued on</label>
                  <input
                    required
                    type="Date"
                    name="date"
                    // val={date}
                    onChange={this.handleChange}
                  ></input>
                </div>
                <div className="submit confirmdiv">
                  <button className="medium ui button confirm">ADD</button>
                </div>
              </div>
            </form>)
    }
}