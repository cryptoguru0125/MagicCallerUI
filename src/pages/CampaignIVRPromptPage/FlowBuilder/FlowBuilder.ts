import Rete from 'rete'
import AreaPlugin from 'rete-area-plugin'
import ConnectionPlugin from 'rete-connection-plugin'
import ReactRenderPlugin from 'rete-react-render-plugin'

import PromptComponent from './Components/PromptComponent'
import TransferComponent from './Components/TransferComponent'
import RemoveComponent from './Components/RemoveComponent'
import StandardComponent from './Components/StandardComponent'
import EndCallComponent from './Components/EndCallComponent'
// import mockup from './mockup.json'

export default async function(container, nodes, onEvent) {
  if (!container) {
    return null
  }

  const components = [
    new PromptComponent(),
    new TransferComponent(),
    new RemoveComponent(),
    new EndCallComponent(),
    new StandardComponent(),
  ]

  const editor: any = new Rete.NodeEditor('demo@0.1.0', container)
  editor.use(ConnectionPlugin, { curvature: 5 })
  // editor.use(ConnectionReroutePlugin)
  editor.use(ReactRenderPlugin, {})

  const engine = new Rete.Engine('demo@0.1.0')

  components.forEach(c => {
    editor.register(c)
    engine.register(c)
  })

  editor.on(
    [
      'process',
      'nodecreated',
      'noderemoved',
      'connectioncreated',
      'connectionremoved',
    ],
    async () => {
      await engine.abort()
      await engine.process(editor.toJSON())
    }
  )

  editor.on('connectionpath', data => {
    const { points } = data

    const [x1, y1, x2, y2] = points
    const mid = Math.abs(y2 - y1)
    const depth = 50

    data.d = `M ${x1} ${y1} C ${x1 - depth} ${y1 + mid} ${x2 + depth} ${y2 -
      mid} ${x2} ${y2}` // you can override the path curve
  })

  editor.fromJSON({
    id: 'demo@0.1.0',
    nodes,
  })
  // editor.fromJSON(mockup)

  editor.view.resize()
  AreaPlugin.zoomAt(editor)
  editor.trigger('process')

  return editor
}
