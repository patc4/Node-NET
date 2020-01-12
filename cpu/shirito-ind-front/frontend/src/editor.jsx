import "regenerator-runtime/runtime";
import Rete from "rete";
import ReactRenderPlugin from "rete-react-render-plugin";
import ConnectionPlugin from "rete-connection-plugin";
import ContextMenuPlugin from "rete-context-menu-plugin";
import AreaPlugin from "rete-area-plugin";
import { CharacterNode } from './nodes/CharacterNode';
import { AddNode } from './nodes/AddNode';
import { DisplayNode } from './nodes/DisplayNode';
import { StartNode } from './nodes/StartNode';

export let numSocket = new Rete.Socket("Number value");
export let execSocket = new Rete.Socket("Execute");
export let testSocket = new Rete.Socket("Execute Test");

export default async function (container) {
  var components = [new AddNode(), new CharacterNode(), new DisplayNode(), new StartNode()];
  var excludeFromContextMenu = ["start"]

  var editor = new Rete.NodeEditor("demo@0.1.0", container);
  editor.use(ConnectionPlugin);
  editor.use(ReactRenderPlugin);
  editor.use(ContextMenuPlugin, {
    searchBar: false,
    delay: 100,
    allocate(component) {
      if (excludeFromContextMenu.indexOf(component.name.toLowerCase()) !== -1) {
        return null;
      }
      return ['Create Node'];
    },
    rename(component) {
      return component.name;
    },
    items: {
      'Click me'() { console.log('Works!') }
    }
  });

  var engine = new Rete.Engine("demo@0.1.0");

  components.map(c => {
    editor.register(c);
    engine.register(c);
  });

  editor.on(
    "process keydown nodecreated noderemoved connectioncreated connectionremoved",
    async () => {
      console.log("process");
      await engine.abort();
      await engine.process(editor.toJSON());
    }
  );

  editor.fromJSON({
    id: "demo@0.1.0",
    nodes: {
      "1": {
        id: 1,
        data: {},
        inputs: {},
        outputs: { exec: { connections: [] } },
        position: [-214, -331],
        name: "Start"
      },
    }
  });

  editor.view.resize();
  AreaPlugin.zoomAt(editor);
  editor.trigger("process");
}