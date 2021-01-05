import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { connect } from 'react-redux'
import { updateProjects,deleteProjects } from '../../store/actions/user'

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: this.props.user.projects,
      show: false,
    };
    this.handleshow = () => {
      this.setState({ show: true });
    };
    this.handleclose = () => {
      this.setState({ show: false });
    };
    this.handleexpsub = (data) => {
      this.props.updateProjects(data, this.props.user._id).then(
        () => {
          console.log('Project Added')
          this.setState({ show: false })
        }
      ).catch((err) => err)
    };
    this.deleteproj=(e)=>{
      console.log(e._id)
      this.props.deleteProjects(e,this.props.user._id).then(()=>{

      console.log('delted')
      this.setState({})
    }
      ).catch((e)=>console.log(e))
    }
  }
  render() {
    console.log("rendering again")
    return (
      <div id="experience">
        {this.props.owner && <button onClick={this.handleshow} className="experience-add ui button ">Add + </button>}
        <div style={{ overflowY: 'auto', maxHeight: '800px' }}>
          {this.props.user.projects.map((e, i) => {
            return (
              <div className="experience-ele project-ele">
                <h4>{e.title}{this.props.owner && <span class="deleteproj" onClick={()=>{this.deleteproj(e)}}><i className="fa fa-trash"></i></span>}</h4>
                <p>
                  {new Date(e.startdate).toDateString() + '-' + (e.enddate === null ? "Present" : new Date(e.enddate).toDateString())}
                  <br></br>
                  <h6>
                    {e.description}
                  </h6>
                  <a href={e.link} target="_blank" rel="noreferrer">see project</a>
                </p>
                {/* <hr className="short br-lighter"></hr> */}
              </div>)
          })}
        </div>
        <Modal size="lg" show={this.state.show} onHide={this.handleclose} backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title>Fill Project Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ProjectForm {...this.props} onexpsub={this.handleexpsub}></ProjectForm>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}


class ProjectForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      startdate: "",
      enddate: null,
      description: "",
      link:""
    };
    this.handleSubmit = (e) => {
      e.preventDefault()
      props.onexpsub(this.state);
      this.setState({
        title: "",
        startdate: "",
        enddate: null,
        description: "",
        link:""
      })
    }
    this.handleChange = (e) => {
      this.setState({ [e.target.name]: e.target.value })
    }
    this.handleenddate = (e) => {
      if (this.state.enddate === null) {
        this.setState({ enddate: false })

      }
      else {
        this.setState({ enddate: null })
      }
    }
  }
  render() {
    const {
      title,
      startdate,
      enddate,
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
              val={title}
              onChange={this.handleChange}
              type="text"
              placeholder="eg. Builded Sudoku Solver"
            ></input>
          </div>
          <div className="field">

            <input type="checkbox" defaultChecked={true} onClick={this.handleenddate}></input>currently working
          </div>
          <div className="two fields">
            <div className="field">
              <label>Start date</label>
              <input
                required
                type="Date"
                name="startdate"
                val={startdate}
                onChange={this.handleChange}
              ></input>
            </div>
            {this.state.enddate !== null &&
              <div className="field">
                <label>End date</label>
                <input
                  required
                  type="Date"
                  name="enddate"
                  val={enddate}
                  onChange={this.handleChange}
                ></input>
              </div>}
          </div>
          <div className="field">
            <label>description</label>
            <textarea
              maxlength="200"
              rows="2"
              placeholder="eg. used python and back tracking algorithm"
              name="description"
              val={description}
              onChange={this.handleChange}
            ></textarea>
          </div>
          <div className="field">
            <label>Link</label>
            <input
              name="link"
              required
              val={link}
              onChange={this.handleChange}
              type="url"
              placeholder="eg. https://github.com/Vedan..."
            ></input>
          </div>
          <div className="submit confirmdiv">
            <button className="medium ui button confirm">ADD</button>
          </div>
        </div>
      </form>
    );
  }
}

export default connect(() => { }, { updateProjects,deleteProjects })(Project);