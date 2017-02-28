import { Action } from '@ngrx/store';
import { tassign } from 'tassign';
import { Trip, TripHolder, TripCriteria } from './trip.model';
import { Tab } from '../app-shared/tabset/tab.model';
import { type } from '../app-shared/type-cache';

export const TripActionTypes = {
    SEARCH: type('[Trip] Search'),
    SEARCH_COMPLETE: type('[Trip] Search Complete'),
    SEARCH_RESET: type('[Trip] Search Reset'),
    SEARCH_CRITERIA_CHANGE: type('[Trip] Search Criteria Change'),
    OPEN: type('[Trip] Open'),
    TAB_ACTIVATE: type('[Trip] Tab Activate'),
    CLOSE: type('[Trip] Close'),
    INSERT_COMPLETE: type('[Trip] Insert Complete'),
    UPDATE_COMPLETE: type('[Trip] Update Complete')
}

export type SearchStatus = 'ready' | 'searching' | 'empty' | 'complete';
export interface TripState {
    criteria: TripCriteria,
    searchStatus: SearchStatus;
    results: Trip[],
    openList: TripHolder[],
    activeTabId: string,
    nextNewId: number
}
const initialState: TripState = {
    criteria: null, searchStatus: 'ready', results: [], openList: [], activeTabId: '', nextNewId: 0
};

export function TripReducer(state = initialState, action: TripActions): TripState {
    switch (action.type) {
        case TripActionTypes.SEARCH:
            let searchAction = <TripSearchAction>action;
            return tassign(state, {
                criteria: searchAction.payload,
                searchStatus: 'searching',
                results: null
            });
        case TripActionTypes.SEARCH_COMPLETE:
            let completeAction = <TripSearchCompleteAction>action;
            return tassign(state, {
                searchStatus: completeAction.payload.length > 0 ? 'complete' : 'empty',
                results: completeAction.payload
            });
        case TripActionTypes.SEARCH_CRITERIA_CHANGE: {
            let changeAction = <TripSearchCriteriaChangeAction>action;
            return tassign(state, {
                criteria: changeAction.payload || {}
            });
        }
        case TripActionTypes.SEARCH_RESET: {
            return tassign(state, {
                criteria: {},
                searchStatus: 'ready',
                results: []
            });
        }
        case TripActionTypes.OPEN:
            let openAction = <TripOpenAction>action;
            let oholder = new TripHolder();
            oholder.Trip = openAction.payload || new Trip();
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
            let activateAction = <TripTabActivateAction>action;
            return tassign(state, {
                activeTabId: activateAction.payload
            });
        case TripActionTypes.CLOSE:
            let closeAction = <TripCloseAction>action;
            return tassign(state, {
                openList: state.openList.filter(x => x.PlaceholderId !== closeAction.payload),
                activeTabId: state.activeTabId !== closeAction.payload ? state.activeTabId
                    : state.openList.length > 0 && state.openList[0].PlaceholderId !== closeAction.payload
                        ? state.openList[0].PlaceholderId
                        : ''
            });
        case TripActionTypes.INSERT_COMPLETE:
            let insertAction = <TripInsertAction>action;
            let oldId = insertAction.payload.PlaceholderId;
            insertAction.payload.PlaceholderId = insertAction.payload.Trip.TripId;
            return tassign(state, {
                results: [insertAction.payload.Trip].concat(state.results), //add to top
                openList: state.openList.map(i => i.PlaceholderId === oldId ? insertAction.payload : i)
                //TODO: if this was the active tab, the tab id is being updated, so the 'activeTabId' should update to match
            });
        case TripActionTypes.UPDATE_COMPLETE:
            let updateAction = <TripUpdateAction>action;
            return tassign(state, {
                results: state.results.map(existing => existing.TripId === updateAction.payload.Trip.TripId ? updateAction.payload.Trip : existing),
                openList: state.openList.map(i => i.PlaceholderId === updateAction.payload.PlaceholderId ? updateAction.payload : i)
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

export class TripSearchCriteriaChangeAction implements Action {
    type = TripActionTypes.SEARCH_CRITERIA_CHANGE;
    constructor(public payload: TripCriteria) { }
}

export class TripSearchResetAction implements Action {
    type = TripActionTypes.SEARCH_RESET;
    constructor() { }
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
    | TripSearchCriteriaChangeAction
    | TripSearchResetAction
    | TripOpenAction
    | TripTabActivateAction
    | TripCloseAction
    | TripInsertAction
    | TripUpdateAction;