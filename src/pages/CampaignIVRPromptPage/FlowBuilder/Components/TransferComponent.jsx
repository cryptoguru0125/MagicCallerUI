import Rete from 'rete'
import { ivrSocket } from '../Sockets'
import TransferNode from '../Nodes/TransferNode'

export default class TransferComponent extends Rete.Component {
  constructor() {
    super('Transfer')

    this.data.component = TransferNode
  }

  builder = node => {
    const inp = new Rete.Input('in', 'Number', ivrSocket, true)

    return node.addInput(inp)
  }

  worker = (node, inputs, outputs) => {}
}
