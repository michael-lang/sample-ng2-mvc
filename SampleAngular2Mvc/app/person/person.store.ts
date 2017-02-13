import { Action } from '@ngrx/store';
import { tassign } from 'tassign';
import { Person, PersonHolder, PersonCriteria } from './person.model';
import { Tab } from '../app-shared/tabset/tab.model';
import { type } from '../app-shared/type-cache';

export const PersonActionTypes = {
    SEARCH: type('[Person] Search'),
    SEARCH_COMPLETE: type('[Person] Search Complete'),
    OPEN: type('[Person] Open'),
    CLOSE: type('[Person] Close'),
    INSERT_COMPLETE: type('[Person] Insert Complete'),
    UPDATE_COMPLETE: type('[Person] Update Complete')
}

export interface PersonState {
    criteria: PersonCriteria,
    isSearching: boolean,
    results: Person[],
    hasResults: boolean,
    openList: PersonHolder[],
    nextNewId: number
}
const initialState: PersonState = {
    criteria: null, isSearching: false, results: [], hasResults: false, openList: [], nextNewId: 0
};

export function PersonReducer(state = initialState, action: PersonActions): PersonState {
    switch (action.type) {
        case PersonActionTypes.SEARCH:
            return tassign(state, {
                criteria: <PersonCriteria>action.payload,
                isSearching: true,
                results: null,
                hasResults: false
            });
        case PersonActionTypes.SEARCH_COMPLETE:
            return tassign(state, {
                isSearching: false,
                results: <Person[]>action.payload,
                hasResults: action.payload && (<Person[]>action.payload).length > 0
            });
        case PersonActionTypes.OPEN:
            let oholder = new PersonHolder();
            oholder.Person = (<Person>action.payload) || new Person();
            if (oholder.Person.PersonId && oholder.Person.PersonId.length > 0) {
                oholder.PlaceholderId = oholder.Person.PersonId;
                var openFilter = state.openList.filter(x => x.Person.PersonId === oholder.Person.PersonId);
                if (openFilter.length > 0) {
                    return state; //already open, nothing to do
                }
            } else {
                oholder.PlaceholderId = "new-" + state.nextNewId;
            }

            return tassign(state, {
                openList: state.openList.concat([oholder]),
                nextNewId: state.nextNewId + 1
            });
        case PersonActionTypes.CLOSE:
            return tassign(state, {
                openList: state.openList.filter(x => x.PlaceholderId !== (<string>action.payload))
            });
        case PersonActionTypes.INSERT_COMPLETE:
            let iholder = (<PersonHolder>action.payload);
            let oldId = iholder.PlaceholderId;
            iholder.PlaceholderId = iholder.Person.PersonId;
            return tassign(state, {
                results: [iholder.Person].concat(state.results), //add to top
                openList: state.openList.map(i => i.PlaceholderId === oldId ? iholder : i)
            });
        case PersonActionTypes.UPDATE_COMPLETE:
            let uholder = (<PersonHolder>action.payload);
            return tassign(state, {
                results: state.results.map(existing => existing.PersonId === uholder.Person.PersonId ? uholder.Person : existing),
                openList: state.openList.map(i => i.PlaceholderId === uholder.PlaceholderId ? uholder : i)
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

export class PersonOpenAction implements Action {
    type = PersonActionTypes.OPEN;

    constructor(public payload: Person) { }
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
    | PersonOpenAction
    | PersonCloseAction
    | PersonInsertAction
    | PersonUpdateAction;