import Rete from 'rete'
import { ivrSocket } from '../Sockets'
import RemoveNode from '../Nodes/RemoveNode'

export default class RemoveComponent extends Rete.Component {
  constructor() {
    super('Remove')

    this.data.component = RemoveNode
  }

  builder = node => {
    const inp = new Rete.Input('in', 'Number', ivrSocket, true)

    return node.addInput(inp)
  }

  worker = (node, inputs, outputs) => {}
}
