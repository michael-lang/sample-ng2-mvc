import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { Person, PersonHolder, PersonCriteria } from '../person.model';
import { PersonService } from '../person.service'
import { AppState } from '../../app.store';
import { PersonState, PersonOpenAction, PersonSearchAction } from '../person.store';

@Component({
    selector: 'person-search',
    providers: [PersonService],
    templateUrl: '/dist/js/person/search/person-search.component.html'
})
export class PersonSearchComponent {
    results: Observable<Person[]>;
    searching: Observable<boolean>;
    hasResults: Observable<boolean>;

    constructor(private _service: PersonService, private _store: Store<AppState>) {
        this.results = _store.select(x => x.person.results);
        this.searching = _store.select(x => x.person.isSearching);
        this.hasResults = _store.select(x => x.person.hasResults);
    }

    public criteriaReset(reset: boolean): void {
        this._store.dispatch(new PersonSearchAction(new PersonCriteria()));
    }
    public criteriaSubmitted(criteria: PersonCriteria): void {
        this._service.search(criteria);
    }
    public itemSelected(item: Person) {
        this._store.dispatch(new PersonOpenAction(item));
    }
}