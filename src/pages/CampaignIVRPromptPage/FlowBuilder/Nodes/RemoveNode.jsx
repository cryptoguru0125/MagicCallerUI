import React from 'react'
import { Node, Socket } from 'rete-react-render-plugin'
import { MDBIcon } from 'mdbreact'

import classes from './RemoveNode.module.scss'

export default class RemoveNode extends Node {
  handleDelete = () => {
    const { editor, node } = this.props
    editor.triggerIVREvent('remove', node)
  }

  render() {
    const { bindSocket, node } = this.props
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
          <span role="button" title="Remove" onClick={this.handleDelete}>
            <MDBIcon far icon="trash-alt" />
          </span>
        </div>
        <div className={`${classes.content} text-center`}>
          <div className={classes.title}>Remove Lead</div>
          <div className={classes.metrics}>
            <div className="mt-2">
              Uses
              <small className="ml-3">{prompt.used}</small>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
