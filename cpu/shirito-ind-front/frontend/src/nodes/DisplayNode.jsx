import React, { useEffect, useState } from "react";
import Rete, { Control } from "rete";

import { storageSocket } from '../editor';

const DisplayComponent = (props) => {
    return (
        <input key={props.key} type="text" readOnly value={props.value}/>
    );
}

class DisplayControl extends Rete.Control {
    constructor(emitter, key, value) {
        super(key);
        this.data.render = 'react';
        this.component = DisplayComponent;
        this.props = { emitter, key, value };
    }

    setValue (value) {
        this.props = {...this.props, value}
        this.update();
    }
}

export class DisplayNode extends Rete.Component {
    constructor() {
        super('Display');
    }

    builder(node) {
        node.data.value = '';

        const ctrl = new DisplayControl(this.editor, "ctrl", node.data.value);
        node.addControl(ctrl)
        const inp = new Rete.Input('str', 'Storage', storageSocket);
        node.addInput(inp);
        return node
    }

    worker(node, inputs, outputs) {
        if (inputs['str'].length > 0)
            node.data.value = inputs['str'][0];
        const ctrl = this.editor.nodes.find(n => n.id === node.id).controls.get('ctrl')
        ctrl.setValue(node.data.value)
    }
}