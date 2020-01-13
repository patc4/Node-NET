import React, { useEffect, useState } from "react";
import Rete, { Control } from "rete";

import { variableSocket, storageSocket } from '../../editor';

import { OperationComponent } from './OperationNode';
import operations from '../../stores/operations';

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

        var in1 = new Rete.Input("var1", "Variable", variableSocket);
        var in2 = new Rete.Input("var2", "Variable", variableSocket);
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

        if (!this.shouldCompute || !inputs["var1"].length || !inputs["var2"].length || out.connections.length === 0) {
            outputs["str"] = '';
            operations.removeOperation(node.id);
            return
        }

        var n1 = inputs["var1"].length ? inputs["var1"][0] : '';
        var n2 = inputs["var2"].length ? inputs["var2"][0] : '';
        

        if (n1.type === 'string' || n2.type === 'string'){
            const sum = n1.value.toString() + n2.value.toString();
            outputs["str"] = {type: 'string', value: sum};
        }
        else{
            const sum = n1.value + n2.value
            outputs["str"] = {type: 'number', value: sum};
        }

        operations.addNewOperation(node.id);
    }
}
