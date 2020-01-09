import React, { useEffect, useState } from "react";
import Rete, { Control } from "rete";

import { numSocket } from '../editor';

const CharComponent = (props) => {
    const [state, setState] = useState({ value: '' })

    return (
        <input key={props.key} type="text" onChange={(event) => setState(event.target.value)} />
    );
}

class CharControl extends Rete.Control {
    constructor(emitter, key) {
        super(key);
        this.data.render = 'react';
        this.component = CharComponent;
        this.props = { emitter, key };
    }
}

export class CharacterNode extends Rete.Component {
    constructor() {
        super('Character');
    }

    builder(node) {
        node.data.char = '';

        var ctrl = new CharControl(this.editor, "char1");
        node.addControl(ctrl)
        let out = new Rete.Output('char', 'String', numSocket);
        node.addOutput(out);
        return node
    }

    worker(node, inputs, outputs) {
        outputs['char'] = node.data.char;
    }
}