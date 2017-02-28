import { Action } from '@ngrx/store';
import { tassign } from 'tassign';
import { Location, LocationHolder, LocationCriteria } from './location.model';
import { Tab } from '../app-shared/tabset/tab.model';
import { type } from '../app-shared/type-cache';

export const LocationActionTypes = {
    SEARCH: type('[Location] Search'),
    SEARCH_COMPLETE: type('[Location] Search Complete'),
    SEARCH_RESET: type('[Location] Search Reset'),
    SEARCH_CRITERIA_CHANGE: type('[Location] Search Criteria Change'),
    OPEN: type('[Location] Open'),
    TAB_ACTIVATE: type('[Location] Tab Activate'),
    CLOSE: type('[Location] Close'),
    INSERT_COMPLETE: type('[Location] Insert Complete'),
    UPDATE_COMPLETE: type('[Location] Update Complete')
}

export type SearchStatus = 'ready' | 'searching' | 'empty' | 'complete';
export interface LocationState {
    criteria: LocationCriteria,
    searchStatus: SearchStatus;
    results: Location[],
    openList: LocationHolder[],
    activeTabId: string,
    nextNewId: number
}
const initialState: LocationState = {
    criteria: {}, searchStatus: 'ready', results: [], openList: [], activeTabId: '', nextNewId: 0
};

export function LocationReducer(state = initialState, action: LocationActions): LocationState {
    switch (action.type) {
        case LocationActionTypes.SEARCH:
            let searchAction = <LocationSearchAction>action;
            return tassign(state, {
                criteria: searchAction.payload || {},
                searchStatus: 'searching',
                results: null
            });
        case LocationActionTypes.SEARCH_COMPLETE:
            let completeAction = <LocationSearchCompleteAction>action;
            return tassign(state, {
                searchStatus: completeAction.payload.length > 0 ? 'complete' : 'empty',
                results: completeAction.payload
            });
        case LocationActionTypes.SEARCH_CRITERIA_CHANGE: {
            let changeAction = <LocationSearchCriteriaChangeAction>action;
            return tassign(state, {
                criteria: changeAction.payload || {}
            });
        }
        case LocationActionTypes.SEARCH_RESET: {
            return tassign(state, {
                criteria: {},
                searchStatus: 'ready',
                results: []
            });
        }
        case LocationActionTypes.OPEN:
            let openAction = <LocationOpenAction>action;
            let oholder = new LocationHolder();
            oholder.Location = openAction.payload || new Location();
            if (oholder.Location.LocationId && oholder.Location.LocationId.length > 0) {
                oholder.PlaceholderId = oholder.Location.LocationId;
                var openFilter = state.openList.filter(x => x.Location.LocationId === oholder.Location.LocationId);
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
        case LocationActionTypes.TAB_ACTIVATE:
            let activateAction = <LocationTabActivateAction>action;
            return tassign(state, {
                activeTabId: activateAction.payload
            });
        case LocationActionTypes.CLOSE:
            let closeAction = <LocationCloseAction>action;
            return tassign(state, {
                openList: state.openList.filter(x => x.PlaceholderId !== closeAction.payload),
                activeTabId: state.activeTabId !== closeAction.payload ? state.activeTabId
                    : state.openList.length > 0 && state.openList[0].PlaceholderId !== closeAction.payload
                        ? state.openList[0].PlaceholderId
                        : ''
            });
        case LocationActionTypes.INSERT_COMPLETE:
            let insertAction = <LocationInsertAction>action;
            let oldId = insertAction.payload.PlaceholderId;
            insertAction.payload.PlaceholderId = insertAction.payload.Location.LocationId;
            return tassign(state, {
                results: [insertAction.payload.Location].concat(state.results), //add to top
                openList: state.openList.map(i => i.PlaceholderId === oldId ? insertAction.payload : i)
                //TODO: if this was the active tab, the tab id is being updated, so the 'activeTabId' should update to match
            });
        case LocationActionTypes.UPDATE_COMPLETE:
            let updateAction = <LocationUpdateAction>action;
            return tassign(state, {
                results: state.results.map(existing => existing.LocationId === updateAction.payload.Location.LocationId ? updateAction.payload.Location : existing),
                openList: state.openList.map(i => i.PlaceholderId === updateAction.payload.PlaceholderId ? updateAction.payload : i)
            });
        default:
            return state;
    }
}

export class LocationSearchAction implements Action {
    type = LocationActionTypes.SEARCH;

    constructor(public payload: LocationCriteria) { }
}

export class LocationSearchCompleteAction implements Action {
    type = LocationActionTypes.SEARCH_COMPLETE;

    constructor(public payload: Location[]) { }
}

export class LocationSearchCriteriaChangeAction implements Action {
    type = LocationActionTypes.SEARCH_CRITERIA_CHANGE;
    constructor(public payload: LocationCriteria) { }
}

export class LocationSearchResetAction implements Action {
    type = LocationActionTypes.SEARCH_RESET;
    constructor() { }
}


export class LocationOpenAction implements Action {
    type = LocationActionTypes.OPEN;

    constructor(public payload: Location) { }
}

export class LocationTabActivateAction implements Action {
    type = LocationActionTypes.TAB_ACTIVATE;

    constructor(public payload: string) { }
}

export class LocationCloseAction implements Action {
    type = LocationActionTypes.CLOSE;

    constructor(public payload: string) { }
}

export class LocationInsertAction implements Action {
    type = LocationActionTypes.INSERT_COMPLETE;

    constructor(public payload: LocationHolder) { }
}

export class LocationUpdateAction implements Action {
    type = LocationActionTypes.UPDATE_COMPLETE;

    constructor(public payload: LocationHolder) { }
}

export type LocationActions
    = LocationSearchAction
    | LocationSearchCompleteAction
    | LocationSearchCriteriaChangeAction
    | LocationSearchResetAction
    | LocationOpenAction
    | LocationTabActivateAction
    | LocationCloseAction
    | LocationInsertAction
    | LocationUpdateAction;