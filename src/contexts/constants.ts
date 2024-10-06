import { createContext, useContext } from "react";
import { Action, ActionTypes, CreateContextType, ReturnedData } from "../types";
const storedData = localStorage.getItem('storedData');


export const emptyState = {
    name: '',
    email: '',
    phone: '',
    plan: {
        name: '',
        price: 0,
        date: ''
    },
    addOn: [],
};

export const initialState = storedData? JSON.parse(storedData) : emptyState;



export const AddOnContext = createContext<CreateContextType>({
    state: initialState,
    dispatch: () => null,
});

export const addOnReducer = (state: ReturnedData, action: Action) => {
    switch (action.type) {
        case ActionTypes.ADD:
            return action.payload;
        case ActionTypes.REMOVE:
            return action.payload;
        default:
            return state;
    }
};

export const useAddOnValue = () => {
    const value = useContext(AddOnContext);
    return value.state;
};

export const useAddOnDispatch = () => {
    const value = useContext(AddOnContext);
    return value.dispatch;
};