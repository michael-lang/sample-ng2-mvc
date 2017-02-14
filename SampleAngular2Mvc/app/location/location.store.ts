import { Action } from '@ngrx/store';
import { tassign } from 'tassign';
import { Location, LocationHolder, LocationCriteria } from './location.model';
import { Tab } from '../app-shared/tabset/tab.model';
import { type } from '../app-shared/type-cache';

export const LocationActionTypes = {
    SEARCH: type('[Location] Search'),
    SEARCH_COMPLETE: type('[Location] Search Complete'),
    OPEN: type('[Location] Open'),
    TAB_ACTIVATE: type('[Location] Tab Activate'),
    CLOSE: type('[Location] Close'),
    INSERT_COMPLETE: type('[Location] Insert Complete'),
    UPDATE_COMPLETE: type('[Location] Update Complete')
}

export interface LocationState {
    criteria: LocationCriteria,
    isSearching: boolean,
    results: Location[],
    hasResults: boolean,
    openList: LocationHolder[],
    activeTabId: string,
    nextNewId: number
}
const initialState: LocationState = {
    criteria: null, isSearching: false, results: [], hasResults: false, openList: [], activeTabId: '', nextNewId: 0
};

export function LocationReducer(state = initialState, action: LocationActions): LocationState {
    switch (action.type) {
        case LocationActionTypes.SEARCH:
            return tassign(state, {
                criteria: <LocationCriteria>action.payload,
                isSearching: true,
                results: null,
                hasResults: false
            });
        case LocationActionTypes.SEARCH_COMPLETE:
            return tassign(state, {
                isSearching: false,
                results: <Location[]>action.payload,
                hasResults: action.payload && (<Location[]>action.payload).length > 0
            });
        case LocationActionTypes.OPEN:
            let oholder = new LocationHolder();
            oholder.Location = (<Location>action.payload) || new Location();
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
            return tassign(state, {
                activeTabId: action.payload
            });
        case LocationActionTypes.CLOSE:
            return tassign(state, {
                openList: state.openList.filter(x => x.PlaceholderId !== (<string>action.payload)),
                activeTabId: state.activeTabId !== action.payload ? state.activeTabId
                    : state.openList.length > 0 && state.openList[0].PlaceholderId !== action.payload
                        ? state.openList[0].PlaceholderId
                        : ''
            });
        case LocationActionTypes.INSERT_COMPLETE:
            let iholder = (<LocationHolder>action.payload);
            let oldId = iholder.PlaceholderId;
            iholder.PlaceholderId = iholder.Location.LocationId;
            return tassign(state, {
                results: [iholder.Location].concat(state.results), //add to top
                openList: state.openList.map(i => i.PlaceholderId === oldId ? iholder : i)
            });
        case LocationActionTypes.UPDATE_COMPLETE:
            let uholder = (<LocationHolder>action.payload);
            return tassign(state, {
                results: state.results.map(existing => existing.LocationId === uholder.Location.LocationId ? uholder.Location : existing),
                openList: state.openList.map(i => i.PlaceholderId === uholder.PlaceholderId ? uholder : i)
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
    | LocationOpenAction
    | LocationTabActivateAction
    | LocationCloseAction
    | LocationInsertAction
    | LocationUpdateAction;