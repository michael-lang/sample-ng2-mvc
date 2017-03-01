import { Action } from '@ngrx/store';
import { tassign } from 'tassign';
import { Location, LocationHolder, LocationCriteria } from './location.model';
import { Tab } from '../app-shared/tabset/tab.model';
import { type, buildReducer } from '../app-shared/type-cache';

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

export class LocationSearchAction implements Action {
    type = LocationSearchAction.type;
    constructor(public payload: LocationCriteria) { }

    static type: string = type('[Location] Search');
    static reduce(state: LocationState, action: LocationSearchAction) {
        return tassign(state, {
            criteria: action.payload || {},
            searchStatus: 'searching',
            results: null
        });
    }
}

export class LocationSearchCompleteAction implements Action {
    type = LocationSearchCompleteAction.type;
    constructor(public payload: Location[]) { }

    static type: string = type('[Location] Search Complete');
    static reduce(state: LocationState, action: LocationSearchCompleteAction) {
        return tassign(state, {
            searchStatus: action.payload.length > 0 ? 'complete' : 'empty',
            results: action.payload
        });
    }
}

export class LocationSearchCriteriaChangeAction implements Action {
    type = LocationSearchCriteriaChangeAction.type;
    constructor(public payload: LocationCriteria) { }

    static type: string = type('[Location] Search Criteria Change');
    static reduce(state: LocationState, action: LocationSearchCriteriaChangeAction) {
        return tassign(state, {
            criteria: action.payload || {}
        });
    }
}

export class LocationSearchResetAction implements Action {
    type = LocationSearchResetAction.type;
    constructor() { }

    static type: string = type('[Location] Search Reset');
    static reduce(state: LocationState, action: LocationSearchResetAction) {
        return tassign(state, {
            criteria: {},
            searchStatus: 'ready',
            results: []
        });
    }
}

export class LocationOpenAction implements Action {
    type = LocationOpenAction.type;
    constructor(public payload: Location) { }

    static type: string = type('[Location] Open');
    static reduce(state: LocationState, action: LocationOpenAction) {
        let oholder = new LocationHolder();
        oholder.Location = action.payload || new Location();
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
    }
}

export class LocationTabActivateAction implements Action {
    type = LocationTabActivateAction.type;
    constructor(public payload: string) { }

    static type: string = type('[Location] Tab Activate');
    static reduce(state: LocationState, action: LocationTabActivateAction) {
        return tassign(state, {
            activeTabId: action.payload
        });
    }
}

export class LocationCloseAction implements Action {
    type = LocationCloseAction.type;
    constructor(public payload: string) { }

    static type: string = type('[Location] Close');
    static reduce(state: LocationState, action: LocationCloseAction) {
        return tassign(state, {
            openList: state.openList.filter(x => x.PlaceholderId !== action.payload),
            activeTabId: state.activeTabId !== action.payload ? state.activeTabId
                : state.openList.length > 0 && state.openList[0].PlaceholderId !== action.payload
                    ? state.openList[0].PlaceholderId
                    : ''
        });
    }
}

export class LocationInsertAction implements Action {
    type = LocationInsertAction.type;
    constructor(public payload: LocationHolder) { }

    static type: string = type('[Location] Insert Complete');
    static reduce(state: LocationState, action: LocationInsertAction) {
        let oldId = action.payload.PlaceholderId;
        action.payload.PlaceholderId = action.payload.Location.LocationId;
        return tassign(state, {
            results: [action.payload.Location].concat(state.results), //add to top
            openList: state.openList.map(i => i.PlaceholderId === oldId ? action.payload : i)
            //TODO: if this was the active tab, the tab id is being updated, so the 'activeTabId' should update to match
        });
    }
}

export class LocationUpdateAction implements Action {
    type = LocationUpdateAction.type;
    constructor(public payload: LocationHolder) { }

    static type: string = type('[Location] Update Complete');
    static reduce(state: LocationState, action: LocationUpdateAction) {
        return tassign(state, {
            results: state.results.map(existing => existing.LocationId === action.payload.Location.LocationId ? action.payload.Location : existing),
            openList: state.openList.map(i => i.PlaceholderId === action.payload.PlaceholderId ? action.payload : i)
        });
    }
}

export const LocationReducer = buildReducer(initialState,
    LocationSearchAction,
    LocationSearchCompleteAction,
    LocationSearchCriteriaChangeAction,
    LocationSearchResetAction,
    LocationOpenAction,
    LocationTabActivateAction,
    LocationCloseAction,
    LocationInsertAction,
    LocationUpdateAction
);