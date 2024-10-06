import React, { useReducer } from "react";
import { AddOnContext, addOnReducer, initialState } from "./constants";
import { Action, AddOnProviderProp, ReducerData, ReturnedData } from "../types";

const initializer = (initialValue: ReturnedData) => {
    return initialValue;
};



export const AddOnProvider: React.FC<AddOnProviderProp> = ({ children }) => {
    const [value, dispatch]: ReducerData = useReducer<(state: ReturnedData, action: Action) => ReturnedData, ReturnedData>(addOnReducer, initialState, initializer);

    return (
        <AddOnContext.Provider value={{ state: value, dispatch }}>
            { children }
        </AddOnContext.Provider>
    );
};