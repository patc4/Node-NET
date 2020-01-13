import "./node.css"

import React, { useEffect, useState } from "react";
import Rete from "rete";
import ReactRenderPlugin, { Node, Socket, Control } from 'rete-react-render-plugin';

import { numSocket, execSocket } from '../editor';
import operations from "../stores/operations";


class OperationNode extends Node {
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
                    {node.name}
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

export class OperationComponent extends Rete.Component {
    constructor(name) {
        super(name);
        this.data.component = OperationNode; // optional
        this.shouldCompute = true;
    }

    builder(node) {
        var inp = new Rete.Input("exec", "Execution", execSocket, false);
        var out = new Rete.Output("exec", "Execution", execSocket, false);
        return node
            .addInput(inp)
            .addOutput(out);
    }

    worker(node, inputs, outputs) {
        if (inputs['exec'][0]){
            this.shouldCompute = true;
        }
        else {
            this.shouldCompute = false;
            operations.removeOperation(node.id);
        }

        outputs['exec'] = true;
    }
}