import Rete from 'rete'
import { ivrSocket } from '../Sockets'
import EndCallNode from '../Nodes/EndCallNode'

export default class EndCallComponent extends Rete.Component {
  constructor() {
    super('EndCall')

    this.data.component = EndCallNode
  }

  builder = node => {
    const inp = new Rete.Input('in', 'Number', ivrSocket, true)

    return node.addInput(inp)
  }

  worker = (node, inputs, outputs) => {}
}
