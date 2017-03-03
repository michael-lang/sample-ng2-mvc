import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/rx';
import { Store } from '@ngrx/store';
import { tassign } from 'tassign'; //improvement over Object.assign

import { Tab } from '../app-shared/tabset/tab.model';
import { PersonService } from './person.service';
import { Person, PersonHolder, PersonCriteria } from './person.model';
import { AppState } from '../app.store';
import {
    SearchStatus,
    PersonSearchAction, PersonSearchCompleteAction,
    PersonSearchResetAction, PersonSearchCriteriaChangeAction,
    PersonTabActivateAction, PersonOpenAction, PersonCloseAction,
    PersonInsertCompleteAction, PersonUpdateCompleteAction
} from './person.store';

/**
 * Orchestrates the interactions with the REST API, business logic, and access to the local store.
 * All in one place to ease unit testing and centralize logic for DRY code.
 */
@Injectable()
export class PersonOrchestratorService {
    constructor(private _store: Store<AppState>, private _itemService: PersonService) { }
    
    get criteria(): Observable<PersonCriteria> {
        return this._store.select((s: AppState) => s.person.criteria);
    }
    get searchStatus(): Observable<SearchStatus> {
        return this._store.select((s: AppState) => s.person.searchStatus);
    }
    get hasResults(): Observable<boolean> {
        return this.searchStatus.select((s: SearchStatus) => s === 'complete' || s === 'empty');
    }
    get results(): Observable<Person[]> {
        return this._store.select((s: AppState) => s.person.results);
    }
    get openList(): Observable<PersonHolder[]> {
        return this._store.select((s: AppState) => s.person.openList);
    }
    get activeTabId(): Observable<string> {
        return this._store.select((s: AppState) => s.person.activeTabId);
    }

    get tabs(): Observable<Tab[]> {
        let searchTab = new Tab();
        searchTab.id = 'tab-id-search';
        searchTab.title = 'Search';
        searchTab.template = 'search';
        searchTab.active = true;
        searchTab.closeable = false;
        searchTab.itemId = '';
        return this.openList
            .combineLatest(this.activeTabId)
            .map(([people, activeId]) => {
                searchTab.active = activeId === searchTab.id || !activeId;
                return [searchTab].concat(people.map(item => {
                    let exists = item.Person && item.Person.PersonId && item.Person.PersonId.length > 0;
                    let t = new Tab();
                    t.id = item.PlaceholderId;
                    t.title = exists ? item.Person.LastName + ' ' + item.Person.FirstName : 'Add Person';
                    t.template = 'item';
                    t.active = activeId === t.id;
                    t.closeable = true;
                    t.item = item;
                    t.itemId = item.Person.PersonId;
                    return t;
                }));
            });
    }

    public search(criteria: PersonCriteria): void {
        this._store.dispatch(new PersonSearchAction(criteria));
        this._itemService
            .search(criteria)
            .subscribe(
            (persons: Person[]) => { this._store.dispatch(new PersonSearchCompleteAction(persons)); },
            error => console.log(error)
            );
    }

    public resetSearch() {
        this._store.dispatch(new PersonSearchResetAction());
    }
    public changeSearch(criteria: PersonCriteria) {
        this._store.dispatch(new PersonSearchCriteriaChangeAction(criteria));
    }

    public add() {
        this._store.dispatch(new PersonOpenAction(new Person()));
    }
    public activate(placeholderId: string) {
        this._store.dispatch(new PersonTabActivateAction(placeholderId));
    }
    public close(placeholderId: string) {
        this._store.dispatch(new PersonCloseAction(placeholderId));
    }

    public open(person: Person) {
        this._store.dispatch(new PersonOpenAction(person));
    }

    public save(vh: PersonHolder) {
        this._itemService.save(vh.Person)
            .subscribe((v) => {
                if (vh.isNew) {
                    this._store.dispatch(new PersonInsertCompleteAction(tassign(vh, { Person: v })));
                } else {
                    this._store.dispatch(new PersonUpdateCompleteAction(tassign(vh, { Person: v })));
                }
            });
    }
}