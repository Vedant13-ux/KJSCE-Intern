import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { connect } from 'react-redux'
import { updateExperiences } from '../../store/actions/user'

class Experience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list:this.props.currentUser.user.experiences,
      show: false,
    };
    this.handleshow = () => {
      this.setState({ show: true });
    };
    this.handleclose = () => {
      this.setState({ show: false });
    };
    this.handleexpsub=(data)=>{
      this.props.updateExperiences(data,this.props.currentUser.user._id).then(
        () => {
          console.log('Experience Added')
          this.setState({show:false})
        }
      ).catch((err) => err)
    };
  }
  render() {
    return (
      <div id="experience">
        <button onClick={this.handleshow} className="experience-add btn btn-primary">add</button>
        {this.state.list.map((e,i)=>{
          return (<div className="experience-ele">
          <h4>{e.title}<sub>{e.type}</sub></h4>
          <p>
            <h5>{e.company}</h5>
            {new Date(e.startdate).toDateString()+'-'+(e.enddate===null?"Present":new Date(e.enddate).toDateString())}
            <br></br>
            <h6>
              {e.description}
            </h6>
          </p>
          <hr className="short br-lighter"></hr>
        </div>)
        })}
        
        <Modal size="lg" show={this.state.show} onHide={this.handleclose} backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title>Fill Experience Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ExperienceForm {...this.props} onexpsub={this.handleexpsub}></ExperienceForm>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}


class ExperienceForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      type: "",
      company: "",
      startdate: "",
      enddate: null,
      description: "",
    };
    this.handleSubmit=(e)=>{
      e.preventDefault()
      props.onexpsub(this.state);
      this.setState({
        title: "",
        type: "",
        company: "",
        startdate: "",
        enddate: null,
        description: "",
      })
    }
    this.handleChange=(e)=>{
      this.setState({[e.target.name]:e.target.value})
    }
    this.handleenddate=(e)=>{
      if( this.state.enddate===null){
        this.setState({enddate:false})

      }
      else{
        this.setState({enddate:null})
      }
    }
  }
  render() {
    const {
      title,
      type,
      company,
      startdate,
      enddate,
      description,
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
              placeholder="eg. Retail sales manager"
            ></input>
          </div>
          <div className="field">
            <label>Type</label>
            <select
              className="ui fluid dropdown"
              name="type"
              onChange={this.handleChange}
              value={type}
            >
              <option value="">None</option>
              <option value="job">Job</option>
              <option value="internship">Internship</option>
              <option value="research">Research</option>
              <option value="member">Member</option>
            </select>
          </div>
          <div className="field">
            <label>Company/Team</label>
            <input
              name="company"
              maxLength="30"
              required
              val={company}
              onChange={this.handleChange}
              type="text"
              placeholder="eg. Microsoft"
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
          {this.state.enddate!==null &&
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
              placeholder="eg. was assigned to tech team"
              name="description"
              val={description}
              onChange={this.handleChange}
            ></textarea>
          </div>
          <div className="submit confirmdiv">
            <button className="medium ui button confirm">ADD</button>
          </div>
        </div>
      </form>
    );
  }
}
function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps, { updateExperiences })(Experience);

  /* <div class="ui feed">
  <div class="event">
    <div class="label">
      <img src="/images/avatar/small/elliot.jpg">
    </div>
    <div class="content">
      <div class="summary">
        <a class="user">
          Elliot Fu
        </a> added you as a friend
        <div class="date">
          1 Hour Ago
        </div>
      </div>
      <div class="meta">
        <a class="like">
          <i class="like icon"></i> 4 Likes
        </a>
      </div>
    </div>
  </div>
  <div class="event">
    <div class="label">
      <img src="/images/avatar/small/helen.jpg">
    </div>
    <div class="content">
      <div class="summary">
        <a>Helen Troy</a> added <a>2 new illustrations</a>
        <div class="date">
          4 days ago
        </div>
      </div>
      <div class="extra images">
        <a><img src="/images/wireframe/image.png"></a>
        <a><img src="/images/wireframe/image.png"></a>
      </div>
      <div class="meta">
        <a class="like">
          <i class="like icon"></i> 1 Like
        </a>
      </div>
    </div>
  </div>
  <div class="event">
    <div class="label">
      <img src="/images/avatar/small/jenny.jpg">
    </div>
    <div class="content">
      <div class="summary">
        <a class="user">
          Jenny Hess
        </a> added you as a friend
        <div class="date">
          2 Days Ago
        </div>
      </div>
      <div class="meta">
        <a class="like">
          <i class="like icon"></i> 8 Likes
        </a>
      </div>
    </div>
  </div>
  <div class="event">
    <div class="label">
      <img src="/images/avatar/small/joe.jpg">
    </div>
    <div class="content">
      <div class="summary">
        <a>Joe Henderson</a> posted on his page
        <div class="date">
          3 days ago
        </div>
      </div>
      <div class="extra text">
        Ours is a life of constant reruns. We're always circling back to where we'd we started, then starting all over again. Even if we don't run extra laps that day, we surely will come back for more of the same another day soon.
      </div>
      <div class="meta">
        <a class="like">
          <i class="like icon"></i> 5 Likes
        </a>
      </div>
    </div>
  </div>
  <div class="event">
    <div class="label">
      <img src="/images/avatar/small/justen.jpg">
    </div>
    <div class="content">
      <div class="summary">
        <a>Justen Kitsune</a> added <a>2 new photos</a> of you
        <div class="date">
          4 days ago
        </div>
      </div>
      <div class="extra images">
        <a><img src="/images/wireframe/image.png"></a>
        <a><img src="/images/wireframe/image.png"></a>
      </div>
      <div class="meta">
        <a class="like">
          <i class="like icon"></i> 41 Likes
        </a>
      </div>
    </div>
  </div>
</div> */
