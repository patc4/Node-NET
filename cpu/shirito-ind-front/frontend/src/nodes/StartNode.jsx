import "./node.css"

import React, { useEffect, useState } from "react";
import Rete from "rete";
import ReactRenderPlugin, { Node, Socket, Control } from 'rete-react-render-plugin';

import { numSocket, execSocket } from '../editor';


class StartRender extends Node {
    render() {
        const { node, bindSocket, bindControl } = this.props;
        const { outputs, controls, inputs, selected } = this.state;

        return (
            <div className={`node ${selected}`}>
                <div className="title">
                    {"<<"} {node.name} {">>"}
                </div>
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

export class StartNode extends Rete.Component {
    constructor() {
        super('Start');
        this.data.component = StartRender; // optional
    }

    builder(node) {
        var out = new Rete.Output("exec", "Execution", execSocket);
        return node.addOutput(out);
    }

    worker(node, inputs, outputs) {
        outputs['exec'] = true;
    }
}