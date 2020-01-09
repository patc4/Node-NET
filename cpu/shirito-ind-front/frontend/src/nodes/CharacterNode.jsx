import React, { useEffect, useState } from "react";
import Rete, { Control } from "rete";

import { numSocket } from '../editor';

const CharComponent = (props) => {
    const [state, setState] = useState({ value: '' })

    const update = (event) => {
        const val = event.target.value;
        props.putData('val', val);
        props.emitter.trigger('process');
        setState(val);
    };

    return (
        <input key={props.key} type="text" onChange={(event) => update(event)} />
    );
}

class CharControl extends Rete.Control {
    constructor(emitter, key) {
        super(key);
        this.data.render = 'react';
        this.component = CharComponent;
        this.props = { emitter, key, putData: this.putData.bind(this)};
    }
}

export class CharacterNode extends Rete.Component {
    constructor() {
        super('Character');
    }

    builder(node) {
        node.data.val = '';

        const ctrl = new CharControl(this.editor, "char1");
        node.addControl(ctrl)
        const out = new Rete.Output('char', 'String', numSocket);
        node.addOutput(out);
        return node
    }

    worker(node, inputs, outputs) {
        outputs['char'] = node.data.val;
    }
}