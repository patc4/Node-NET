import React, { useState, useEffect } from "react";
import operations from "../stores/operations";


export const Informations = () => {
    const [operationsStore, setOperationStore] = useState(operations.initialState)

    useEffect(() => {
        const operationsSubscription = operations.subscribe(setOperationStore);
        return () => {
            operationsSubscription.unsubscribe();
        };
    }, []);

    return <span className="informations" >Number of operations: {Object.keys(operationsStore.operationsId).length}</span>
};