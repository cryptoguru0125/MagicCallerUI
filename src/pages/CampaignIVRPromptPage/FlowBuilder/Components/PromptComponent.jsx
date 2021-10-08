import Rete from 'rete'
import { ivrSocket } from '../Sockets'
import PromptNode from '../Nodes/PromptNode'

export default class PromptComponent extends Rete.Component {
  constructor() {
    super('Prompt')

    this.data.component = PromptNode
  }

  builder = node => {
    const { data } = node

    node.addInput(new Rete.Input('in', 'Number', ivrSocket, true))

    for (let i = 0; i < data.buttons.length; i += 1) {
      node.addOutput(new Rete.Output(`${i}`, 'Number', ivrSocket, false))
    }

    return node
  }

  worker = (node, inputs, outputs) => {}
}
