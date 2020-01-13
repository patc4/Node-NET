import {Subject} from 'rxjs';

const subject = new Subject();

const initialState = {
    operationsId: {}
};
let state = initialState;

const operations = {
    init: () => subject.next(state),
    subscribe: setState => subject.subscribe(setState),
    unsubscribe: () => subject.unsubscribe(),
    addNewOperation: newId => {
        let newOperationsId = {...state.operationsId};
        newOperationsId[newId] = true;
        state = {
            ...state,
            operationsId: newOperationsId,
        };
        subject.next(state);
    },
    removeOperation: newId => {
        let newOperationsId = state.operationsId;
        delete newOperationsId[newId];
        state = {
            ...state,
            operationsId: newOperationsId,
        };
        subject.next(state);
    },
    initialState
};

export default operations