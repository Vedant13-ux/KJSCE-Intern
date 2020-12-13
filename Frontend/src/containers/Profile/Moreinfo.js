import React, { Component} from "react";
import Modal from "react-bootstrap/Modal";
import { Multiselect } from "multiselect-react-dropdown";
import { apiCall } from "../../services/api";

class Basic extends Component {
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
      show1:false,
      show2:false,
      preskills:[]
    };
    this.handleSkills = this.handleSkills.bind(this);
    this.multiselectRef = React.createRef();

    this.handleClose1 = () => this.setState({show1:false});
    this.handleShow1 = () => this.setState({show1:true});

    this.handleClose2 = () => this.setState({show2:false});
    this.handleShow2 = () => this.setState({show2:true});
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

  render() {
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
            <span onClick={this.handleShow1} className="add">
              <i class="far fa-plus-square"></i>
            </span>
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
                selectedValues={this.state.preskills} 
                displayValue="text"
                onSearch={this.handleSkills}
                ref={this.multiselectRef}
              />
            </Modal.Body>
          </Modal>
        </div>
        <div className="panel">
          <div className="panel-heading">
            <span className="panel-icon">
              <i className="fa fa-pencil" />
            </span>
            <span className="panel-title">Certificates</span>
            <span className="add" onClick={this.handleShow2}>
              <i class="far fa-plus-square"></i>
            </span>
          </div>
          <div className="panel-body pb5"></div>
          <Modal show={this.state.show2} onHide={this.handleClose2} centered>
            <Modal.Header closeButton>
              <Modal.Title>Filter Internships</Modal.Title>
            </Modal.Header>
            <Modal.Body>no</Modal.Body>
          </Modal>
        </div>
      </div>
    );
  }
}

export default Basic;
