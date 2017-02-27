import { Component, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import '@ngrx/core/add/operator/select';
import { Store } from '@ngrx/store';
import { Person, PersonHolder, PersonCriteria } from '../person.model';
import { PersonService } from '../person.service'
import { AppState } from '../../app.store';
import {
    PersonState, SearchStatus,
    PersonSearchAction,
    PersonSearchCriteriaChangeAction,
    PersonOpenAction
} from '../person.store';

@Component({
    selector: 'person-search',
    providers: [PersonService],
    templateUrl: '/dist/js/person/search/person-search.component.html'
})
export class PersonSearchComponent {
    public searchStatus$: Observable<SearchStatus>;
    public criteria$: Observable<PersonCriteria>;
    public hasResults$: Observable<boolean>;
    public results$: Observable<Person[]>;
    @Output() doOpen: EventEmitter<Person> = new EventEmitter();

    constructor(private _service: PersonService, private _store: Store<AppState>) {
        this.searchStatus$ = _store.select(x => x.person.searchStatus);
        this.criteria$ = _store.select((s: AppState) => s.person.criteria);
        this.hasResults$ = this.searchStatus$.select((s: SearchStatus) => s === 'complete' || s === 'empty');
        this.results$ = _store.select(x => x.person.results);
    }

    public criteriaReset(reset: boolean): void {
        this._store.dispatch(new PersonSearchAction(new PersonCriteria()));
    }
    public criteriaChange(criteria: PersonCriteria): void {
        this._store.dispatch(new PersonSearchCriteriaChangeAction(criteria));
    }
    public criteriaSubmitted(criteria: PersonCriteria): void {
        this._service.search(criteria);
    }
    public itemSelected(item: Person) {
        this.doOpen.emit(item);
    }
}