import { Action } from '@ngrx/store';
import { tassign } from 'tassign';
import { Person, PersonHolder, PersonCriteria } from './person.model';
import { Tab } from '../app-shared/tabset/tab.model';
import { type, buildReducer } from '../app-shared/type-cache';

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

export class PersonSearchAction implements Action {
    type = PersonSearchAction.type;
    constructor(public payload: PersonCriteria) { }
    
    static type: string = type('[Person] Search');
    static reduce(state: PersonState, action: PersonSearchAction) {
        return tassign(state, {
            criteria: action.payload || {},
            searchStatus: 'searching',
            results: null
        });
    }
}

export class PersonSearchCompleteAction implements Action {
    type = PersonSearchCompleteAction.type;
    constructor(public payload: Person[]) { }
    
    static type: string = type('[Person] Search Complete');
    static reduce(state: PersonState, action: PersonSearchCompleteAction) {
        return tassign(state, {
            searchStatus: action.payload.length > 0 ? 'complete' : 'empty',
            results: action.payload
        });
    }
}

export class PersonSearchCriteriaChangeAction implements Action {
    type = PersonSearchCriteriaChangeAction.type;
    constructor(public payload: PersonCriteria) { }
    
    static type: string = type('[Person] Search Criteria Change');
    static reduce(state: PersonState, action: PersonSearchCriteriaChangeAction) {
        return tassign(state, {
            criteria: action.payload || {}
        });
    }
}

export class PersonSearchResetAction implements Action {
    type = PersonSearchResetAction.type;
    constructor() { }
    
    static type: string = type('[Person] Search Reset');
    static reduce(state: PersonState, action: PersonSearchResetAction) {
        return tassign(state, {
            criteria: {},
            searchStatus: 'ready',
            results: []
        });
    }
}

export class PersonOpenAction implements Action {
    type = PersonOpenAction.type;
    constructor(public payload: Person) { }

    static type: string = type('[Person] Open');
    static reduce(state: PersonState, action: PersonOpenAction) {
        let oholder = new PersonHolder();
        oholder.Person = action.payload || new Person();
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
    }
}

export class PersonTabActivateAction implements Action {
    type = PersonTabActivateAction.type;
    constructor(public payload: string) { }
    
    static type: string = type('[Person] Tab Activate');
    static reduce(state: PersonState, action: PersonTabActivateAction) {
        return tassign(state, {
            activeTabId: action.payload
        });
    }
}

export class PersonCloseAction implements Action {
    type = PersonCloseAction.type;
    constructor(public payload: string) { }
    
    static type: string = type('[Person] Close');
    static reduce(state: PersonState, action: PersonCloseAction) {
        return tassign(state, {
            openList: state.openList.filter(x => x.PlaceholderId !== action.payload),
            activeTabId: state.activeTabId !== action.payload ? state.activeTabId
                : state.openList.length > 0 && state.openList[0].PlaceholderId !== action.payload
                    ? state.openList[0].PlaceholderId
                    : ''
        });
    }
}

export class PersonInsertAction implements Action {
    type = PersonInsertAction.type;
    constructor(public payload: PersonHolder) { }
    
    static type: string = type('[Person] Insert Complete');
    static reduce(state: PersonState, action: PersonInsertAction) {
        let oldId = action.payload.PlaceholderId;
        action.payload.PlaceholderId = action.payload.Person.PersonId;
        return tassign(state, {
            results: [action.payload.Person].concat(state.results), //add to top
            openList: state.openList.map(i => i.PlaceholderId === oldId ? action.payload : i)
            //TODO: if this was the active tab, the tab id is being updated, so the 'activeTabId' should update to match
        });
    }
}

export class PersonUpdateAction implements Action {
    type = PersonUpdateAction.type;
    constructor(public payload: PersonHolder) { }
    
    static type: string = type('[Person] Update Complete');
    static reduce(state: PersonState, action: PersonUpdateAction) {
        return tassign(state, {
            results: state.results.map(existing => existing.PersonId === action.payload.Person.PersonId ? action.payload.Person : existing),
            openList: state.openList.map(i => i.PlaceholderId === action.payload.PlaceholderId ? action.payload : i)
        });
    }
}

export const PersonReducer = buildReducer(initialState,
    PersonSearchAction,
    PersonSearchCompleteAction,
    PersonSearchCriteriaChangeAction,
    PersonSearchResetAction,
    PersonOpenAction,
    PersonTabActivateAction,
    PersonCloseAction,
    PersonInsertAction,
    PersonUpdateAction
);