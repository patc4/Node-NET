import React, { useEffect, useState } from "react";
import Rete, { Control } from "rete";

import { numSocket } from '../editor';

const AddComponent = (props) => {
    return (
        <div/>
    );
}

class AddControl extends Rete.Control {
    constructor(emitter, key, readonly) {
        super(key);
        this.data.render = 'react';
        this.component = AddComponent;
        this.props = { emitter, key };
    }
}

export class AddNode extends Rete.Component {
    constructor() {
        super("Add");
    }

    builder(node) {
        var in1 = new Rete.Input("str1", "String", numSocket);
        var in2 = new Rete.Input("str2", "String", numSocket);
        var out = new Rete.Output("str", "String", numSocket);
        var ctrl = new AddControl(this.editor, "Add");

        return node
            .addInput(in1)
            .addInput(in2)
            .addOutput(out)
            .addControl(ctrl);
    }

    worker(node, inputs, outputs) {
        outputs['str'] = inputs["str1"] + inputs["str2"]
    }
}
