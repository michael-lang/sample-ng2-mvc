import { Action } from '@ngrx/store';
import { tassign } from 'tassign';
import { Person, PersonHolder, PersonCriteria } from './person.model';
import { Tab } from '../app-shared/tabset/tab.model';
import { type } from '../app-shared/type-cache';

export const PersonActionTypes = {
    SEARCH: type('[Person] Search'),
    SEARCH_COMPLETE: type('[Person] Search Complete'),
    SEARCH_RESET: type('[Person] Search Reset'),
    SEARCH_CRITERIA_CHANGE: type('[Person] Search Criteria Change'),
    OPEN: type('[Person] Open'),
    TAB_ACTIVATE: type('[Person] Tab Activate'),
    CLOSE: type('[Person] Close'),
    INSERT_COMPLETE: type('[Person] Insert Complete'),
    UPDATE_COMPLETE: type('[Person] Update Complete')
}

export type SearchStatus = 'ready' | 'searching' | 'empty' | 'complete';
export interface PersonState {
    criteria: PersonCriteria,
    searchStatus: SearchStatus;
    results: Person[],
    openList: PersonHolder[],
    activeTabId: string,
    nextNewId: number
}
const initialState: PersonState = {
    criteria: {}, searchStatus: 'ready', results: [], openList: [], activeTabId: '', nextNewId: 0
};

export function PersonReducer(state = initialState, action: PersonActions): PersonState {
    switch (action.type) {
        case PersonActionTypes.SEARCH:
            let searchAction = <PersonSearchAction>action;
            return tassign(state, {
                criteria: searchAction.payload || {},
                searchStatus: 'searching',
                results: null
            });
        case PersonActionTypes.SEARCH_COMPLETE:
            let completeAction = <PersonSearchCompleteAction>action;
            return tassign(state, {
                searchStatus: completeAction.payload.length > 0 ? 'complete' : 'empty',
                results: completeAction.payload
            });
        case PersonActionTypes.SEARCH_CRITERIA_CHANGE: {
            let changeAction = <PersonSearchCriteriaChangeAction>action;
            return tassign(state, {
                criteria: changeAction.payload || {}
            });
        }
        case PersonActionTypes.SEARCH_RESET: {
            return tassign(state, {
                criteria: {},
                searchStatus: 'ready',
                results: []
            });
        }
        case PersonActionTypes.OPEN:
            let openAction = <PersonOpenAction>action;
            let oholder = new PersonHolder();
            oholder.Person = openAction.payload || new Person();
            if (oholder.Person.PersonId && oholder.Person.PersonId.length > 0) {
                oholder.PlaceholderId = oholder.Person.PersonId;
                var openFilter = state.openList.filter(x => x.Person.PersonId === oholder.Person.PersonId);
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
        case PersonActionTypes.TAB_ACTIVATE:
            let activateAction = <PersonTabActivateAction>action;
            return tassign(state, {
                activeTabId: activateAction.payload
            });
        case PersonActionTypes.CLOSE:
            let closeAction = <PersonCloseAction>action;
            return tassign(state, {
                openList: state.openList.filter(x => x.PlaceholderId !== closeAction.payload),
                activeTabId: state.activeTabId !== closeAction.payload ? state.activeTabId 
                    : state.openList.length > 0 && state.openList[0].PlaceholderId !== closeAction.payload
                        ? state.openList[0].PlaceholderId
                        : ''
            });
        case PersonActionTypes.INSERT_COMPLETE:
            let insertAction = <PersonInsertAction>action;
            let oldId = insertAction.payload.PlaceholderId;
            insertAction.payload.PlaceholderId = insertAction.payload.Person.PersonId;
            return tassign(state, {
                results: [insertAction.payload.Person].concat(state.results), //add to top
                openList: state.openList.map(i => i.PlaceholderId === oldId ? insertAction.payload : i)
                //TODO: if this was the active tab, the tab id is being updated, so the 'activeTabId' should update to match
            });
        case PersonActionTypes.UPDATE_COMPLETE:
            let updateAction = <PersonUpdateAction>action;
            return tassign(state, {
                results: state.results.map(existing => existing.PersonId === updateAction.payload.Person.PersonId ? updateAction.payload.Person : existing),
                openList: state.openList.map(i => i.PlaceholderId === updateAction.payload.PlaceholderId ? updateAction.payload : i)
            });
        default:
            return state;
    }
}

export class PersonSearchAction implements Action {
    type = PersonActionTypes.SEARCH;

    constructor(public payload: PersonCriteria) { }
}

export class PersonSearchCompleteAction implements Action {
    type = PersonActionTypes.SEARCH_COMPLETE;

    constructor(public payload: Person[]) { }
}

export class PersonSearchCriteriaChangeAction implements Action {
    type = PersonActionTypes.SEARCH_CRITERIA_CHANGE;
    constructor(public payload: PersonCriteria) { }
}

export class PersonSearchResetAction implements Action {
    type = PersonActionTypes.SEARCH_RESET;
    constructor() { }
}

export class PersonOpenAction implements Action {
    type = PersonActionTypes.OPEN;

    constructor(public payload: Person) { }
}

export class PersonTabActivateAction implements Action {
    type = PersonActionTypes.TAB_ACTIVATE;

    constructor(public payload: string) { }
}

export class PersonCloseAction implements Action {
    type = PersonActionTypes.CLOSE;

    constructor(public payload: string) { }
}

export class PersonInsertAction implements Action {
    type = PersonActionTypes.INSERT_COMPLETE;

    constructor(public payload: PersonHolder) { }
}

export class PersonUpdateAction implements Action {
    type = PersonActionTypes.UPDATE_COMPLETE;

    constructor(public payload: PersonHolder) { }
}

export type PersonActions
    = PersonSearchAction
    | PersonSearchCompleteAction
    | PersonSearchCriteriaChangeAction
    | PersonSearchResetAction
    | PersonOpenAction
    | PersonTabActivateAction
    | PersonCloseAction
    | PersonInsertAction
    | PersonUpdateAction;