import { Dispatch, ReactNode } from "react";

export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
}

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;

    diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
    'Healthy' = 0,
    'LowRisk' = 1,
    'HighRisk' = 2,
    'CriticalRisk' = 3,
}

export interface SickLeave {
    startDate: string;
    endDate: string;
}

export enum Type {
    HealthCheck = 'HealthCheck',
    OccupationalHealthcare = 'OccupationalHealthcare',
    Hospital = 'Hospital',
}

export interface HealthCheckEntry extends BaseEntry {
    type: 'HealthCheck';
    healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
    type: 'OccupationalHealthcare';
    employerName: string;
    sickLeave?: SickLeave;
}

export interface Discharge {
    date: string;
    criteria: string;
}

export interface HospitalEntry extends BaseEntry {
    type: 'Hospital';
    discharge: Discharge;
}

export type Entry =
    | HospitalEntry
    | OccupationalHealthcareEntry
    | HealthCheckEntry;

export interface Patient {
    id: string;
    name: string;
    occupation: string;
    gender: Gender;
    ssn?: string;
    dateOfBirth?: string;
    entries: Entry[];
}

export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

export type PatientFormValues = Omit<Patient, 'id' | 'entries'>;

type UnionOmit<T, K extends string | number | symbol> = T extends unknown
    ? Omit<T, K>
    : never;

export type NewEntry = UnionOmit<Entry, 'id'>;



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