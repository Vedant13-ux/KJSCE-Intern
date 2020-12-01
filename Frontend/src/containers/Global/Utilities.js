import React, { useState } from 'react'
import { Dropdown } from 'semantic-ui-react'
import Modal from 'react-bootstrap/Modal'
import Internshipform from '../Homepage/Internshipform'

const stateOptions = [
  {
    key: 0,
    text: "ok",
    value: "ok"
  }, {
    key: 1,
    text: "ok1",
    value: "ok1"
  }, {
    key: 2,
    text: "ok2",
    value: "ok2"
  }
]

export function Skills() {
  return (
    <Dropdown
      placeholder='Skills'
      fluid
      multiple
      search
      selection
      options={stateOptions}
    />
  )
}

export function InternshipCreate() {
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
        <Modal.Body><Internshipform></Internshipform></Modal.Body>
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
      <Modal  show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Filter Internships</Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
      </Modal>
    </div>
  )
}