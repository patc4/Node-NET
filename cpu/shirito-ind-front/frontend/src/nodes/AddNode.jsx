import React, { useEffect, useState } from "react";
import Rete, { Control } from "rete";

import { numSocket, storageSocket } from '../editor';

import { OperationComponent } from './OperationNode';
import operations from '../stores/operations';

const AddComponent = (props) => {
    return (
        <div />
    );
}

class AddControl extends Rete.Control {
    constructor(emitter, key, readonly) {
        super(key);
        this.data.render = 'react';
        this.component = AddComponent;
        this.props = { emitter, key };
    }

    setValue(value) {
        this.props = { ...this.props, value }
        this.update();
    }
}

export class AddNode extends OperationComponent {
    constructor() {
        super("Add");
    }

    builder(node) {
        node = super.builder(node);

        var in1 = new Rete.Input("str1", "String", numSocket);
        var in2 = new Rete.Input("str2", "String", numSocket);
        var out = new Rete.Output("str", "Storage", storageSocket);
        var ctrl = new AddControl(this.editor, "ctrl");

        return node
            .addInput(in1)
            .addInput(in2)
            .addOutput(out)
            .addControl(ctrl);
    }

    worker(node, inputs, outputs) {
        super.worker(node, inputs, outputs);

        const out = this.editor.nodes.find(n => n.id === node.id).outputs.get('str')

        if (!this.shouldCompute || !inputs["str1"].length || !inputs["str2"].length || out.connections.length === 0) {
            outputs["str"] = '';
            operations.removeOperation(node.id);
            return
        }

        var n1 = inputs["str1"].length ? inputs["str1"][0] : '';
        var n2 = inputs["str2"].length ? inputs["str2"][0] : '';
        var sum = n1 + n2;

        outputs["str"] = sum;
        operations.addNewOperation(node.id);
    }
}
