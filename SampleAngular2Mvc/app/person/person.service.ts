import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Store } from '@ngrx/store';
import { Configuration } from '../app.constants';
import {
    Person,
    PersonHolder,
    PersonCriteria
} from './person.model';
import { AppState } from '../app.store';
import {
    PersonSearchAction,
    PersonSearchCompleteAction,
    PersonUpdateCompleteAction,
    PersonInsertCompleteAction
} from './person.store';

@Injectable()
export class PersonService {
    private baseUrl: string;
    private headers: Headers;

    constructor(private _http: Http, private _configuration: Configuration, private _store: Store<AppState>) {
        this.baseUrl = _configuration.Server + _configuration.ApiUrl + 'person';
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');       
    }

    public search(criteria: PersonCriteria) {
        this._store.dispatch(new PersonSearchAction(criteria));
        this._http.post(this.baseUrl + '/search', criteria, { headers: this.headers })
            .map((response: Response) =>
                <Person[]>response.json())
            .subscribe(payload =>
                this._store.dispatch(new PersonSearchCompleteAction(payload)),
                error => { }, //TODO: call another search failed action??
                () => { } //on complete
            );
    }
    public save(item: PersonHolder) {
        let isUpdate = item.Person.PersonId;
        return this._http.post(this.baseUrl + '/', item.Person, { headers: this.headers })
            .map((response: Response) => <Person>response.json())
            .subscribe(result => {
                let updated = new PersonHolder();
                updated.PlaceholderId = item.PlaceholderId;
                updated.Person = result;
                isUpdate
                    ? this._store.dispatch(new PersonUpdateCompleteAction(updated))
                    : this._store.dispatch(new PersonInsertCompleteAction(updated))
                },
                error => { }, //TODO: call another save failed action??
                () => { } //on complete
            );
    }
}