import { ActionReducer } from '@ngrx/store';
import { combineReducers } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { compose } from "@ngrx/core";
import { environment } from './environments/environment';
import * as person from './person/person.store';
import * as location from './location/location.store';
import * as trip from './trip/trip.store';

export interface AppState {
    person: person.PersonState,
    location: location.LocationState,
    trip: trip.TripState
}

const reducers = {
    person: person.PersonReducer,
    location: location.LocationReducer,
    trip: trip.TripReducer
}

const developmentReducer: ActionReducer<AppState> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<AppState> = combineReducers(reducers);

export function AppReducer(state: any, action: any) {
    if (environment.enableStoreFreeze && !environment.production)
        return developmentReducer(state, action);
    else
        return productionReducer(state, action);
}