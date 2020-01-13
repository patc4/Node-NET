import React, { useEffect, useState } from "react";
import Rete, { Control } from "rete";

import { storageSocket } from '../../editor';
import storage from "../../stores/storage";

const RegisterComponent = (props) => {
    const [regId, setRegId] = useState('');

    const renderRegistersId = () => {
        let render = [];
        for (let id = 0; id < 6; id++) {
            render.push(<option value={id}>{id}</option>)
        }
        return render
    };

    const setValue = (event) => {
        const value = event.target.value;
        props.putData('regId', value);
        props.emitter.trigger('process');
        setRegId(value);
    };

    return (
        <select key={props.key} defaultValue={0} onChange={(event) => setValue(event)} value={regId}>
            {renderRegistersId()}
        </select>
    );
}

class RegisterControl extends Rete.Control {
    constructor(emitter, key) {
        super(key);
        this.data.render = 'react';
        this.component = RegisterComponent;
        this.props = { emitter, key, putData: this.putData.bind(this) };
    }
}

export class RegisterNode extends Rete.Component {
    constructor() {
        super('Register');
        this.regId = null;
    }

    builder(node) {
        node.data.regId = 0;

        const ctrl = new RegisterControl(this.editor, "reg");
        node.addControl(ctrl)
        const inp = new Rete.Input('str', 'Storage', storageSocket);
        node.addInput(inp);
        return node
    }


    worker(node, inputs, outputs) {
        if (inputs['str'].length > 0) {
            storage.setRegisterValue(node.data.regId, inputs['str'][0])
        }
    }
}