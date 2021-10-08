import React from 'react'
import { initialize as initializeForm } from 'redux-form'
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
} from 'mdbreact'

import * as actions from 'store/blockLists/actions'
import BlockListForm from './BlockListForm'
import BlockListTable from './BlockListTable'

interface Props {
  blockLists: BlockList[]
}

interface States {
  modal: string
}

class BlockListsPage extends React.Component<Props & Dispatch, States> {
  state = {
    modal: null,
  }

  constructor(props) {
    super(props)

    this.props.dispatch(actions.getBlockLists())
  }

  handleCreateBlockList = () => {
    this.props.dispatch(initializeForm('BlockListForm', { type: 'Email' }))
    this.setState({
      modal: 'create',
    })
  }

  handleDeleteBlockList = (row: BlockList) => {
    // eslint-disable-next-line
    if (!window.confirm('Are you sure to delete?')) {
      return
    }

    this.props.dispatch(actions.deleteBlockList(row.id))
  }

  toggleModal = () => {
    this.setState({ modal: null })
  }

  handleSubmit = values => {
    let promise: Promise<any>

    if (values.id) {
      promise = this.props.dispatch(actions.updateBlockList(values.id, values))
    } else {
      promise = this.props.dispatch(actions.createBlockList(values))
    }
    return promise.then(() => {
      this.toggleModal()
    })
  }

  render() {
    const { blockLists } = this.props
    const { modal } = this.state

    return (
      <MDBContainer>
        <div className='d-flex align-items-center'>
          <div className='align-self-center ml-auto'>
            <MDBBtn
              color='primary'
              onClick={this.handleCreateBlockList}
              className='ml-auto mr-0'
            >
              Add BlockList
            </MDBBtn>
          </div>
        </div>

        <MDBCard>
          <MDBCardBody>
            <BlockListTable
              data={blockLists}
              onDelete={this.handleDeleteBlockList}
            />
          </MDBCardBody>
        </MDBCard>

        <MDBModal isOpen={!!modal} toggle={this.toggleModal}>
          <MDBModalHeader
            className='text-center'
            titleClass='w-100 font-weight-bold'
            toggle={this.toggleModal}
          >
            {modal === 'create' ? 'Add BlockList' : 'Edit BlockList'}
          </MDBModalHeader>
          <MDBModalBody>
            <BlockListForm
              isCreate={modal === 'create'}
              onSubmit={this.handleSubmit}
            >
              <div className='button-row'>
                {modal === 'create' ? (
                  <MDBBtn type='submit' color='primary'>
                    Create
                  </MDBBtn>
                ) : (
                  <MDBBtn type='submit' color='success'>
                    Update
                  </MDBBtn>
                )}

                <MDBBtn type='button' color='white' onClick={this.toggleModal}>
                  Cancel
                </MDBBtn>
              </div>
            </BlockListForm>
          </MDBModalBody>
        </MDBModal>
      </MDBContainer>
    )
  }
}

export default BlockListsPage
