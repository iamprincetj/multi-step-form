import { Dispatch, ReactNode } from "react";
// NEW

export interface Plans {
    name: string;
    price: number;
    date: string;
}

export interface ReturnedData {
    name: string;
    email: string;
    phone: string;
    plan: Plans;
    addOn: Plans[];
}

export enum ActionTypes {
    ADD = 'ADD',
    REMOVE = 'REMOVE'
}

export interface Action {
    type: string;
    payload: ReturnedData;
}

export interface CreateContextType {
    state: ReturnedData;
    dispatch: Dispatch<Action>;
}

export interface AddOnProviderProp {
    children: ReactNode;
}

export type ReducerData = [ReturnedData, React.Dispatch<Action>];