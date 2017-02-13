import { ActionReducer } from '@ngrx/store';
import { combineReducers } from '@ngrx/store';
import * as person from './person/person.store';

export interface AppState {
    person: person.PersonState
    //TODO: reference other state stores here: Trip, Location
}

const reducers = {
    person: person.PersonReducer,
    //TODO: reference other state reducers here: Trip, Location
}

const productionReducer: ActionReducer<AppState> = combineReducers(reducers);

export function AppReducer(state: any, action: any) {
    //TODO: add an environment switch here if an alternate for development is needed
    return productionReducer(state, action);
}