import React , { useState } from "react";
import Modal from 'react-bootstrap/Modal'

function Basic(props) {
  const [show1, setShow1] = useState(false);

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const [show2, setShow2] = useState(false);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  return (
    <div className="col-md-4">
      <div className="panel">
        <div className="panel-heading">
          <span className="panel-icon">
            <i className="fa fa-star" />
          </span>
          <span className="panel-title">Info</span>
          <span className="add"><i class="fas fa-edit"></i></span>
        </div>
        <div className="panel-body pn">
          <table className="table mbn tc-icon-1 tc-med-2 tc-bold-last">
            <tbody>
              <tr>
                <td>Department</td>
                <td style={{ textTransform: 'uppercase' }}>{props.user.dept}</td>
              </tr>
              <tr>
                <td>Year</td>
                <td>{props.user.year}</td>
              </tr>
              <tr>
                <td>Roll number</td>
                <td>{props.user.rollNo}</td>
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
          <span onClick={handleShow1} className="add"><i class="far fa-plus-square"></i></span>
        </div>
        <div className="panel-body pb5">
          {props.user.skills.map((s) => (
            <div className="tagsskill">{s}</div>
          ))}
        </div>
        <Modal show={show1} onHide={handleClose1} centered>
        <Modal.Header closeButton>
          <Modal.Title>Filter Internships</Modal.Title>
        </Modal.Header>
        <Modal.Body>ok</Modal.Body>
      </Modal>
      </div>
      <div className="panel">
        <div className="panel-heading">
          <span className="panel-icon">
            <i className="fa fa-pencil" />
          </span>
          <span className="panel-title">Certificates</span>
          <span className="add" onClick={handleShow2}><i class="far fa-plus-square"></i></span>
        </div>
        <div className="panel-body pb5"></div>
        <Modal show={show2} onHide={handleClose2} centered>
        <Modal.Header closeButton>
          <Modal.Title>Filter Internships</Modal.Title>
        </Modal.Header>
        <Modal.Body>no</Modal.Body>
      </Modal>
      </div>
    </div>
  );
}

export default Basic;
