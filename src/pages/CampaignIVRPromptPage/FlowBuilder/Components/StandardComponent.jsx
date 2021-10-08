import Rete from 'rete'
import { ivrSocket } from '../Sockets'
import StandardNode from '../Nodes/StandardNode'

export default class StandardComponent extends Rete.Component {
  constructor() {
    super('Standard')

    this.data.component = StandardNode
  }

  builder = node => {
    const inp = new Rete.Input('in', 'Number', ivrSocket, true)
    const out1 = new Rete.Output('1', 'Number', ivrSocket)

    return node.addInput(inp).addOutput(out1)
  }

  worker = (node, inputs, outputs) => {
    console.log(outputs)
  }
}
