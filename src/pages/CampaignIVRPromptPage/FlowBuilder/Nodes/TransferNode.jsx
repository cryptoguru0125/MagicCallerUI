import React from 'react'
import { Node, Socket } from 'rete-react-render-plugin'
import { MDBIcon } from 'mdbreact'
import objectPath from 'object-path'

import classes from './TransferNode.module.scss'

export default class TransferNode extends Node {
  handleEdit = () => {
    const { editor, node } = this.props
    editor.triggerIVREvent('edit', node)
  }

  handleDelete = () => {
    const { editor, node } = this.props
    editor.triggerIVREvent('remove', node)
  }

  render() {
    const { node, bindSocket } = this.props
    const { inputs, selected } = this.state
    const { data: prompt } = node

    return (
      <div className={`${classes.node} ${selected}`}>
        {/* Inputs */}
        {inputs.map(input => (
          <div className={classes.input} key={input.key}>
            <Socket
              type="input"
              socket={input.socket}
              io={input}
              innerRef={bindSocket}
            />
          </div>
        ))}

        <div className={classes.toolbar}>
          <span role="button" title="Edit" onClick={this.handleEdit}>
            <MDBIcon icon="pencil-alt" />
          </span>
          <span role="button" title="Remove" onClick={this.handleDelete}>
            <MDBIcon far icon="trash-alt" />
          </span>
        </div>
        <div className={`${classes.content} text-center`}>
          <div className={classes.title}>Transfer Call</div>
          <p className={classes.message}>
            {objectPath.get(prompt, 'TransferOption.name') || ''}
          </p>
          <div className={classes.metrics}>
            <div>
              Uses
              <small className="ml-2">{prompt.used}</small>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
