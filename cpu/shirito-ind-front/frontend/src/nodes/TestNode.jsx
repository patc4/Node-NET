import "./node.css"

import React, { useEffect, useState } from "react";
import Rete from "rete";
import ReactRenderPlugin, { Node, Socket, Control } from 'rete-react-render-plugin';

import { numSocket, execSocket } from '../editor';


class MyNode extends Node {
    render() {
        const { node, bindSocket, bindControl } = this.props;
        const { outputs, controls, inputs, selected } = this.state;

        let outputList = []
        let inputList = []

        for (let idx = 1; idx < inputs.length; idx++) {
            inputList.push(
                <div className="input" key={inputs[idx].key}>
                    <Socket
                        type="input"
                        socket={inputs[idx].socket}
                        io={inputs[idx]}
                        innerRef={bindSocket}
                    />
                    {!inputs[idx].showControl() && (
                        <div className="input-title">{inputs[idx].name}</div>
                    )}
                    {inputs[idx].showControl() && (
                        <Control
                            className="input-control"
                            control={inputs[idx].control}
                            innerRef={bindControl}
                        />
                    )}
                </div>);
        }

        for (let idx = 1; idx < outputs.length; idx++) {
            outputList.push(
                <div className="output" key={outputs[idx].key}>
                    <div className="output-title">{outputs[idx].name}</div>
                    <Socket
                        type="output"
                        socket={outputs[idx].socket}
                        io={outputs[idx]}
                        innerRef={bindSocket}
                    />
                </div>);
        }

        return (
            <div className={`node ${selected}`}>
                <div className="input" key={inputs[0].key}>
                    <div className="top-execution-socket">
                        <Socket
                            type="input"
                            socket={inputs[0].socket}
                            io={inputs[0]}
                            innerRef={bindSocket}
                        />
                    </div>
                </div>
                <div className="socket-spacer" ></div>
                <div className="title">
                    {"<<"} {node.name} {">>"}
                </div>
                {/* Outputs */}
                {outputList}
                {/* Controls */}
                {controls.map(control => (
                    <Control
                        className="control"
                        key={control.key}
                        control={control}
                        innerRef={bindControl}
                    />
                ))}
                {/* Inputs */}
                {inputList}
                <div className="socket-spacer" ></div>
                <div className="output" key={outputs[0].key}>
                    <div className="bot-execution-socket">
                        <Socket
                            type="output"
                            socket={outputs[0].socket}
                            io={outputs[0]}
                            innerRef={bindSocket}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

class NumControl extends Rete.Control {
    static component = ({ value, onChange }) => (
        <input
            type="number"
            value={value}
            ref={ref => {
                ref && ref.addEventListener("pointerdown", e => e.stopPropagation());
            }}
            onChange={e => onChange(+e.target.value)}
        />
    );

    constructor(emitter, key, node, readonly = false) {
        super(key);
        this.emitter = emitter;
        this.key = key;
        this.component = NumControl.component;

        const initial = node.data[key] || 0;

        node.data[key] = initial;
        this.props = {
            readonly,
            value: initial,
            onChange: v => {
                this.setValue(v);
                this.emitter.trigger("process");
            }
        };
    }

    setValue(val) {
        this.props.value = val;
        this.putData(this.key, val);
    }
}

class NumComponent extends Rete.Component {
    constructor() {
        super("Number");
    }

    builder(node) {
        var out1 = new Rete.Output("num", "Number", numSocket);
        var ctrl = new NumControl(this.editor, "num", node);

        return node.addControl(ctrl).addOutput(out1);
    }

    worker(node, inputs, outputs) {
        outputs["num"] = node.data.num;
    }
}

class AddParentComponent extends Rete.Component {
    constructor(name) {
        super(name);
        this.data.component = MyNode; // optional
    }

    builder(node) {
        return node
    }

    worker(node, inputs, outputs) {
    }
}

export class TestNode extends AddParentComponent {
    constructor() {
        super("Test");
    }

    builder(node) {
        super.builder(node);

        var inp1 = new Rete.Input("num1", "Number", execSocket);
        var inp2 = new Rete.Input("num2", "Number2", numSocket);
        var out = new Rete.Output("num", "Number", execSocket);
        var out2 = new Rete.Output("num2", "Number", numSocket);

        inp2.addControl(new NumControl(this.editor, "num2", node));

        return node
            .addInput(inp1)
            .addInput(inp2)
            .addControl(new NumControl(this.editor, "preview", node, true))
            .addOutput(out)
            .addOutput(out2);
    }

    worker(node, inputs, outputs) {
        super.worker(node, inputs, outputs);

        var n1 = inputs["num1"].length ? inputs["num1"][0] : node.data.num1;
        var n2 = inputs["num2"].length ? inputs["num2"][0] : node.data.num2;
        var sum = n1 + n2;

        this.editor.nodes
            .find(n => n.id == node.id)
            .controls.get("preview")
            .setValue(sum);
        outputs["num"] = sum;
    }
}