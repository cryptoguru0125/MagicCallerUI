import React, { useState } from 'react'
import {
  MDBIcon, MDBModal, MDBModalBody, MDBModalHeader,
} from 'mdbreact'

interface Props {
  body: string
}

const SMSViewer: React.FC<Props> = ({ body }) => {
  const [show, setShow] = useState(false)

  const toggleView = () => {
    setShow(!show)
  }

  return (
    <React.Fragment>
      <span
        className="mini-audio active"
        title="Click to view SMS"
        onClick={toggleView}
      >
        <MDBIcon far icon="file-alt" />
      </span>

      {show && (
        <MDBModal isOpen={true} toggle={toggleView}>
          <MDBModalHeader
            className="text-center"
            titleClass="w-100 font-weight-bold"
            toggle={toggleView}
          >
            SMS Content
          </MDBModalHeader>
          <MDBModalBody className="text-left">{body}</MDBModalBody>
        </MDBModal>
      )}
    </React.Fragment>
  )
}

export default SMSViewer
