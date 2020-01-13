import React, { useEffect, useState } from "react";
import Rete, { Control } from "rete";

import { variableSocket } from '../../editor';

const CharComponent = (props) => {
    const [state, setState] = useState({ value: '' })
    let asciiChars = [];
    for (var i = 32; i <= 126; i++) {
        asciiChars.push(String.fromCharCode(i));
    }

    const update = (event) => {
        const val = event.target.value;
        props.putData('val', val);
        props.emitter.trigger('process');
        setState(val);
    };

 

    return (
        <select  key={props.key} onChange={(event) => update(event)}>
            {asciiChars.map(c => (<option key={asciiChars.indexOf(c)} value={c}>{c}</option>))}
        </select >
    );
}

class CharControl extends Rete.Control {
    constructor(emitter, key) {
        super(key);
        this.data.render = 'react';
        this.component = CharComponent;
        this.props = { emitter, key, putData: this.putData.bind(this) };
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
        const out = new Rete.Output('char', 'Variable', variableSocket);
        node.addOutput(out);
        return node
    }

    worker(node, inputs, outputs) {
        outputs['char'] = {type:"string", value:node.data.val};
    }
}