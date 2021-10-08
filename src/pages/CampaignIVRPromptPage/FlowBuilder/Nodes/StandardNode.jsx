import React from 'react'
import { Node, Socket, Control } from 'rete-react-render-plugin'

export default class StandardNode extends Node {
  render() {
    const { node, bindSocket, bindControl } = this.props
    const {
      outputs, controls, inputs, selected,
    } = this.state

    return (
      <div className={`node ${selected}`}>
        <div className="title">{node.name}</div>
        {/* Inputs */}
        {inputs.map(input => (
          <div className="input" key={input.key}>
            <Socket
              type="input"
              socket={input.socket}
              io={input}
              innerRef={bindSocket}
            />
            {!input.showControl() && (
              <div className="input-title">{input.name}</div>
            )}
            {input.showControl() && (
              <Control
                className="input-control"
                control={input.control}
                innerRef={bindControl}
              />
            )}
          </div>
        ))}
        {/* Controls */}
        {controls.map(control => (
          <Control
            className="control"
            key={control.key}
            control={control}
            innerRef={bindControl}
          />
        ))}
        {/* Outputs */}
        {outputs.map(output => (
          <div className="output text-center" key={output.key}>
            <Socket
              type="output"
              socket={output.socket}
              io={output}
              innerRef={bindSocket}
            />
          </div>
        ))}
      </div>
    )
  }
}
