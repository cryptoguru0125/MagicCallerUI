import React from 'react'
import { Node, Socket } from 'rete-react-render-plugin'
import { MDBIcon } from 'mdbreact'

import MiniAudioPlayer from 'components/MiniAudioPlayer'
import classes from './EndCallNode.module.scss'

export default class EndCallNode extends Node {
  handleEdit = () => {
    const { editor, node } = this.props
    editor.triggerIVREvent('edit', node)
  }

  handleDelete = () => {
    const { editor, node } = this.props
    editor.triggerIVREvent('remove', node)
  }

  render() {
    const { bindSocket, node } = this.props
    const { inputs, selected } = this.state
    const { data: prompt } = node
    const [message] = prompt.messages

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
          {message && message.audio && (
            <MiniAudioPlayer
              url={`/api/storage/promptAudios/${message.audio}`}
            />
          )}
          <span role="button" title="Edit" onClick={this.handleEdit}>
            <MDBIcon icon="pencil-alt" />
          </span>
          <span role="button" title="Remove" onClick={this.handleDelete}>
            <MDBIcon far icon="trash-alt" />
          </span>
        </div>

        <div className={`${classes.content} text-center`}>
          <div className={classes.title}>End Call</div>
          <div className={classes.metrics}>
            <div className="mt-2">
              Uses
              <small className="ml-3">{message ? message.used : 0}</small>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
