import React, { Component } from 'react'

export class Experience{
    constructor(props){
        super(props)

    }
    render(){

    }
}

export class ExperienceForm{
    constructor(props){
        super(props)
    }
    render(){
        <form onSubmit={this.handleSubmit} id="internshipForm">
              <div className="ui form">
                <div className="field">
                  <label>Title</label>
                  <input
                    name="title"
                    maxLength="30"
                    required
                    val={title}
                    onChange={this.handleChange}
                    type="text"
                    placeholder="eg. Completed Course on Java"
                  ></input>
                </div>
                <div className="field">
                  <label>Issued on</label>
                  <input
                    required
                    type="Date"
                    name="date"
                    val={date}
                    onChange={this.handleChange}
                  ></input>
                </div>
                <div className="submit confirmdiv">
                  <button className="medium ui button confirm">ADD</button>
                </div>
              </div>
            </form>
    }
}