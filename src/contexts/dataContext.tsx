import React, { useReducer } from "react";
import { AddOnContext, addOnReducer, initialState } from "./constants";
import { Action, AddOnProviderProp, ReducerData, ReturnedData } from "../types";



export const AddOnProvider: React.FC<AddOnProviderProp> = ({ children }) => {
    const [value, dispatch]: ReducerData = useReducer<(state: ReturnedData, action: Action) => ReturnedData | never[], ReturnedData>(addOnReducer, initialState);

    return (
        <AddOnContext.Provider value={{ state: value, dispatch }}>
            { children }
        </AddOnContext.Provider>
    );
};