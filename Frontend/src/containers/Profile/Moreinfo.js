import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import { Multiselect } from "multiselect-react-dropdown";
import { apiCall } from "../../services/api";

class Basic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      certform: {
        title: "",
        provider: "",
        date: new Date(),
        link: "",
      },
      skills: [
        { text: "Python" },
        { text: "Node.Js" },
        { text: "Django" },
        { text: "Javascript" },
        { text: "C++" },
        { text: "React Native" },
      ],
      show1: false,
      show2: false,
    };
    // console.log(props);

    this.multiselectRef = React.createRef();
    this.handleSkills = this.handleSkills.bind(this);
    this.multiselectRef = React.createRef();

    this.handleClose1 = () => this.setState({ show1: false });
    this.handleShow1 = () => this.setState({ show1: true });

    this.handleskillssubmit = this.handleskillssubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.handleClose2 = () => this.setState({ show2: false });
    this.handleShow2 = () => this.setState({ show2: true });
  }

  async handleskillssubmit(e) {
    var skills = this.multiselectRef.current.getSelectedItems();
    var skillArray = [];
    skills.forEach((skill) => {
      skillArray.push(skill.text);
    });
    console.log(skillArray);
    this.props.changeskill(skillArray);
    this.setState({ show1: false });
  }
  async handleSubmit(e) {
    e.preventDefault();
    
    this.props.addcert(this.state.certform);
    this.setState({
      certform: { title: "", provider: "", link: "",date:new Date() },
      show2: false,
    });
  }

  async handleSkills() {
    await this.setState({ error: "" });
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
  handleChange(e) {
    let temp = this.state.certform;
    temp[e.target.name] = e.target.value;
    this.setState({ certform: temp });
    console.log(this.state.certform);
  }

  render() {
    const { title, provider,date, link } = this.state.certform;
    return (
      <div className="col-md-4">
        <div className="panel">
          <div className="panel-heading">
            <span className="panel-icon">
              <i className="fa fa-star" />
            </span>
            <span className="panel-title">Info</span>
            <span className="add">
              <i class="fas fa-edit"></i>
            </span>
          </div>
          <div className="panel-body pn">
            <table className="table mbn tc-icon-1 tc-med-2 tc-bold-last">
              <tbody>
                <tr>
                  <td>Department</td>
                  <td style={{ textTransform: "uppercase" }}>
                    {this.props.user.dept}
                  </td>
                </tr>
                <tr>
                  <td>Year</td>
                  <td>{this.props.user.year}</td>
                </tr>
                <tr>
                  <td>Roll number</td>
                  <td>{this.props.user.rollNo}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="panel">
          <div className="panel-heading">
            <span className="panel-icon">
              <i className="fa fa-trophy" />
            </span>
            <span className="panel-title">Skills</span>
            {this.props.isowner && (
              <span onClick={this.handleShow1} className="add">
                <i class="far fa-plus-square"></i>
              </span>
            )}
          </div>
          <div className="panel-body pb5">
            {this.props.user.skills.map((s) => (
              <div className="tagsskill">{s}</div>
            ))}
          </div>
          <Modal show={this.state.show1} onHide={this.handleClose1} centered>
            <Modal.Header closeButton>
              <Modal.Title>Skills</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Multiselect
                options={this.state.skills}
                selectedValues={this.props.preskills}
                displayValue="text"
                onSearch={this.handleSkills}
                ref={this.multiselectRef}
              />
              <div className="confirmdiv">
              <button
                onClick={this.handleskillssubmit}
                className="confirm medium ui button"
              >
                CONFIRM
              </button></div>
            </Modal.Body>
          </Modal>
        </div>
        <div className="panel">
          <div className="panel-heading">
            <span className="panel-icon">
              <i className="fa fa-pencil" />
            </span>
            <span className="panel-title">Certificates</span>
            {this.props.isowner && (
              <span className="add" onClick={this.handleShow2}>
                <i class="far fa-plus-square"></i>
              </span>
            )}
          </div>
          <div className="panel-body pb5">
            {this.props.user.certificates.map((s) => (
              <div>
                <h4>{s.title}</h4>
                <p>{s.provider}<br></br>
                Issued {s.date.toDateString()}<br></br>
                <a href={s.link}>see creditential</a>
                </p>
                <hr class="short br-lighter"></hr>
              </div>
            ))}
          </div>
          <Modal show={this.state.show2} onHide={this.handleClose2} centered>
            <Modal.Header closeButton>
              <Modal.Title>Certificate</Modal.Title>
            </Modal.Header>
            <Modal.Body>
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
                    <label>Provider</label>
                    <input
                      name="provider"
                      maxLength="30"
                      required
                      val={provider}
                      onChange={this.handleChange}
                      type="text"
                      placeholder="eg. Udemy"
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
                  <div className="field">
                    <label>Link</label>
                    <input
                      name="link"
                      maxLength="100"
                      required
                      val={link}
                      onChange={this.handleChange}
                      type="text"
                      placeholder="eg. https://www.udemy.com/certificate/UC-fb6...."
                    ></input>
                  </div>
                  <div className="submit confirmdiv">
                    <button className="medium ui button confirm">ADD</button>
                  </div>
                </div>
              </form>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    );
  }
}

export default Basic;
