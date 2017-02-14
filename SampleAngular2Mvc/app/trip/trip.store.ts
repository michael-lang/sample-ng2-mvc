import { Action } from '@ngrx/store';
import { tassign } from 'tassign';
import { Trip, TripHolder, TripCriteria } from './trip.model';
import { Tab } from '../app-shared/tabset/tab.model';
import { type } from '../app-shared/type-cache';

export const TripActionTypes = {
    SEARCH: type('[Trip] Search'),
    SEARCH_COMPLETE: type('[Trip] Search Complete'),
    OPEN: type('[Trip] Open'),
    TAB_ACTIVATE: type('[Trip] Tab Activate'),
    CLOSE: type('[Trip] Close'),
    INSERT_COMPLETE: type('[Trip] Insert Complete'),
    UPDATE_COMPLETE: type('[Trip] Update Complete')
}

export interface TripState {
    criteria: TripCriteria,
    isSearching: boolean,
    results: Trip[],
    hasResults: boolean,
    openList: TripHolder[],
    activeTabId: string,
    nextNewId: number
}
const initialState: TripState = {
    criteria: null, isSearching: false, results: [], hasResults: false, openList: [], activeTabId: '', nextNewId: 0
};

export function TripReducer(state = initialState, action: TripActions): TripState {
    switch (action.type) {
        case TripActionTypes.SEARCH:
            return tassign(state, {
                criteria: <TripCriteria>action.payload,
                isSearching: true,
                results: null,
                hasResults: false
            });
        case TripActionTypes.SEARCH_COMPLETE:
            return tassign(state, {
                isSearching: false,
                results: <Trip[]>action.payload,
                hasResults: action.payload && (<Trip[]>action.payload).length > 0
            });
        case TripActionTypes.OPEN:
            let oholder = new TripHolder();
            oholder.Trip = (<Trip>action.payload) || new Trip();
            if (oholder.Trip.TripId && oholder.Trip.TripId.length > 0) {
                oholder.PlaceholderId = oholder.Trip.TripId;
                var openFilter = state.openList.filter(x => x.Trip.TripId === oholder.Trip.TripId);
                if (openFilter.length > 0) {
                    return tassign(state, {
                        activeTabId: oholder.PlaceholderId,
                    });
                }
            } else {
                oholder.PlaceholderId = "new-" + state.nextNewId;
            }

            return tassign(state, {
                openList: state.openList.concat([oholder]),
                activeTabId: oholder.PlaceholderId,
                nextNewId: state.nextNewId + 1
            });
        case TripActionTypes.TAB_ACTIVATE:
            return tassign(state, {
                activeTabId: action.payload
            });
        case TripActionTypes.CLOSE:
            return tassign(state, {
                openList: state.openList.filter(x => x.PlaceholderId !== (<string>action.payload)),
                activeTabId: state.activeTabId !== action.payload ? state.activeTabId
                    : state.openList.length > 0 && state.openList[0].PlaceholderId !== action.payload
                        ? state.openList[0].PlaceholderId
                        : ''
            });
        case TripActionTypes.INSERT_COMPLETE:
            let iholder = (<TripHolder>action.payload);
            let oldId = iholder.PlaceholderId;
            iholder.PlaceholderId = iholder.Trip.TripId;
            return tassign(state, {
                results: [iholder.Trip].concat(state.results), //add to top
                openList: state.openList.map(i => i.PlaceholderId === oldId ? iholder : i)
            });
        case TripActionTypes.UPDATE_COMPLETE:
            let uholder = (<TripHolder>action.payload);
            return tassign(state, {
                results: state.results.map(existing => existing.TripId === uholder.Trip.TripId ? uholder.Trip : existing),
                openList: state.openList.map(i => i.PlaceholderId === uholder.PlaceholderId ? uholder : i)
            });
        default:
            return state;
    }
}

export class TripSearchAction implements Action {
    type = TripActionTypes.SEARCH;

    constructor(public payload: TripCriteria) { }
}

export class TripSearchCompleteAction implements Action {
    type = TripActionTypes.SEARCH_COMPLETE;

    constructor(public payload: Trip[]) { }
}

export class TripOpenAction implements Action {
    type = TripActionTypes.OPEN;

    constructor(public payload: Trip) { }
}

export class TripTabActivateAction implements Action {
    type = TripActionTypes.TAB_ACTIVATE;

    constructor(public payload: string) { }
}

export class TripCloseAction implements Action {
    type = TripActionTypes.CLOSE;

    constructor(public payload: string) { }
}

export class TripInsertAction implements Action {
    type = TripActionTypes.INSERT_COMPLETE;

    constructor(public payload: TripHolder) { }
}

export class TripUpdateAction implements Action {
    type = TripActionTypes.UPDATE_COMPLETE;

    constructor(public payload: TripHolder) { }
}

export type TripActions
    = TripSearchAction
    | TripSearchCompleteAction
    | TripOpenAction
    | TripTabActivateAction
    | TripCloseAction
    | TripInsertAction
    | TripUpdateAction;