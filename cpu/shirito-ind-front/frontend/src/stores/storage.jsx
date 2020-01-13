import { Subject } from 'rxjs';

const subject = new Subject();

const initialState = {
    registers: {}
};
let state = initialState;

const storage = {
    init: () => subject.next(state),
    subscribe: setState => subject.subscribe(setState),
    unsubscribe: () => subject.unsubscribe(),
    setRegisterValue: (regId, newValue) => {
        let newRegisters = { ...state.registers };
        newRegisters[regId] = newValue;
        state = {
            ...state,
            registers: newRegisters,
        };
        subject.next(state);
    },
    getRegisters: () => { return state.registers },
    initialState
};

export default storage