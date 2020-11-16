import React, { Component } from 'react'
import { Dropdown } from 'semantic-ui-react'

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