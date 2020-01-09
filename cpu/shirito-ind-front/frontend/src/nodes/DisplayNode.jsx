import React, { useEffect, useState } from "react";
import Rete, { Control } from "rete";

import { numSocket } from '../editor';

const DisplayComponent = (props) => {
    return (
        <input key={props.key} type="text" readOnly>{props.value}</input>
    );
}

class DisplayControl extends Rete.Control {
    constructor(emitter, key, value) {
        super(key);
        this.data.render = 'react';
        this.component = DisplayComponent;
        this.props = { emitter, key , value};
    }
}

export class DisplayNode extends Rete.Component {
    constructor() {
        super('Display');
    }

    builder(node) {
        node.data.char = '';

        var ctrl = new DisplayControl(this.editor, "char1", node.data.value);
        node.addControl(ctrl)
        let inp = new Rete.Input('char', 'String', numSocket);
        node.addInput(inp);
        return node
    }

    worker(node, inputs, outputs) {
        node.data.value = inputs['char'];
    }
}