import { ActionReducer } from '@ngrx/store';
import { combineReducers } from '@ngrx/store';
import * as person from './person/person.store';
import * as location from './location/location.store';

export interface AppState {
    person: person.PersonState,
    location: location.LocationState
    //TODO: reference other state stores here: Trip
}

const reducers = {
    person: person.PersonReducer,
    location: location.LocationReducer
    //TODO: reference other state reducers here: Trip
}

const productionReducer: ActionReducer<AppState> = combineReducers(reducers);

export function AppReducer(state: any, action: any) {
    //TODO: add an environment switch here if an alternate for development is needed
    return productionReducer(state, action);
}