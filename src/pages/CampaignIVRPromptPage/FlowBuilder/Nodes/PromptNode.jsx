import React from 'react'
import Rete from 'rete'
import { Node, Socket } from 'rete-react-render-plugin'
import { MDBBadge, MDBIcon } from 'mdbreact'
import sumBy from 'lodash/sumBy'

import { percent } from 'utils'
import MiniAudioPlayer from 'components/MiniAudioPlayer'
import { ivrSocket } from '../Sockets'

import classes from './PromptNode.module.scss'

export default class PromptNode extends Node {
  addOutput = () => {
    const { editor, node } = this.props
    const { outputs } = this.state

    const padNumber = outputs.length
    const out = new Rete.Output(`${padNumber}`, 'Number', ivrSocket, false)

    node.data.buttons.push({ next: null, used: 0 })
    node.addOutput(out)
    node.update()

    // fire change event
    editor.triggerIVREvent('update', node)
  }

  removeOutput = key => () => {
    const { editor, node } = this.props

    node.data.buttons.splice(key, 1)

    // fire change event
    editor.triggerIVREvent('update', node, true)
  }

  handleEdit = () => {
    const { editor, node } = this.props
    editor.triggerIVREvent('edit', node)
  }

  handleDelete = () => {
    const { editor, node } = this.props
    editor.triggerIVREvent('remove', node)
  }

  renderMetrics = (totalUsed, totalConversions) => {
    return (
      <div className="row">
        <div className="col-5">
          Uses <small>{totalUsed}</small>
        </div>
        <div className="col-7">
          Conversions{' '}
          <small>
            {`${totalConversions} (${percent(totalUsed, totalConversions)})`}
          </small>
        </div>
      </div>
    )
  }

  render() {
    const { node, bindSocket } = this.props
    const { outputs, inputs, selected } = this.state
    const { data: prompt } = node
    const totalUsed = sumBy(prompt.messages, 'used')
    const totalConversions = sumBy(prompt.messages, 'conversions')

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
        <div className={classes.content}>
          <div className={classes.title}>
            {!!prompt.first && (
              <MDBBadge className="mr-2" color="success">
                First
              </MDBBadge>
            )}

            {prompt.name}
          </div>

          {/* total metrics */}
          {this.renderMetrics(totalUsed, totalConversions)}

          {/* message metrics */}
          {prompt.messages.map(message => (
            <div key={message.id} className={classes.messageDetail}>
              <div className={classes.message}>
                {message.audio && (
                  <MiniAudioPlayer
                    url={`/api/storage/promptAudios/${message.audio}`}
                  />
                )}
                <span className="ml-2">{message.content}</span>
              </div>
              {this.renderMetrics(message.used, message.conversions)}
            </div>
          ))}
        </div>

        {/* Outputs */}
        <div className={classes.outputContainer}>
          {outputs.map(output => (
            <div className={classes.numberSection} key={output.key}>
              <div className="position-relative">
                <strong className="deep-orange-text">
                  {Number(output.key) + 1}
                </strong>
                <span
                  className={classes.removeNumber}
                  role="button"
                  title="Remove Number"
                  onClick={this.removeOutput(output.key)}
                >
                  <MDBIcon icon="times" />
                </span>
              </div>
              {prompt.buttons[output.key] && (
                <small>
                  {`${prompt.buttons[output.key].used || 0} (${percent(
                    totalUsed,
                    prompt.buttons[output.key].used
                  )})`}
                </small>
              )}
              <div>
                <Socket
                  type="output"
                  socket={output.socket}
                  io={output}
                  innerRef={bindSocket}
                />
              </div>
            </div>
          ))}
          <div
            className={`${classes.addSection} ${
              !outputs.length ? 'w-100' : ''
            }`}
            title="Add Number"
          >
            <span role="button" onClick={this.addOutput}>
              <MDBIcon icon="plus-circle" />
            </span>
          </div>
        </div>
      </div>
    )
  }
}
