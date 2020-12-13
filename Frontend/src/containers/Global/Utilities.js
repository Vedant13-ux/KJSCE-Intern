import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Internshipform from '../Homepage/Internshipform'
import FilterForm from '../Homepage/FilterForm'
import ApplyForm from '../InternshipDetails/ApplyForm';


export function InternshipCreate(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <button onClick={handleShow} class="float-bx">
        <i class="fa fa-plus"></i>
      </button>
      <Modal size="lg" show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Fill internship Details</Modal.Title>
        </Modal.Header>
        <Modal.Body><Internshipform userId={props.userId} {...props}></Internshipform></Modal.Body>
      </Modal>
    </div>
  )
}

export function FilterInternships() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <div id="top-bar">
        <button type="button" className="btn btn-default btn-circle btn-lg" onClick={handleShow}>
          <i class="fa fa-filter"></i>
        </button>
      </div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Filter Internships</Modal.Title>
        </Modal.Header>
        <Modal.Body><FilterForm onHide={handleClose} ></FilterForm></Modal.Body>
      </Modal>
    </div>
  )
}

export function ApplyInternship(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  if (!props.applied) {
    return (
      <div>
        <div className="applynow">
          <button type="button" class="btn btn-lg btn-default" onClick={handleShow}>
            Apply Now
          </button>
        </div>
        <Modal show={show} onHide={handleClose} centered backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title>Application</Modal.Title>
          </Modal.Header>
          <Modal.Body><ApplyForm onApply={props.onApply} onHide={handleClose} duration={props.duration} user={props.user} internship={props.internship} applied={props.applied}></ApplyForm></Modal.Body>
        </Modal>
      </div>
    )
  } else {
    return (
      <div className="applynow">
        <button type="button" class="btn btn-lg btn-default" disabled>
          Applied
        </button>
      </div>
    )
  }
}