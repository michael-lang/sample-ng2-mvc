import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { tassign } from 'tassign';
import { Configuration } from '../app.constants';
import {
    Person,
    PersonHolder,
    PersonCriteria
} from './person.model';
import { AppState } from '../app.store';
import {
    PersonState,
    PersonSearchAction,
    PersonSearchCompleteAction,
    PersonUpdateAction,
    PersonInsertAction
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
                () => { } //on success
            );
    }
    //TODO: convert 'get' into a 'load' request that then adds an open item to the store.
    //public get(itemId: string): Observable<Person> {
    //    return this._http.get(this.baseUrl + '/' + itemId)
    //        .map((response: Response) => <Person>response.json());
    //}
    public save(item: PersonHolder) {
        let isUpdate = item.Person.PersonId;
        return this._http.post(this.baseUrl + '/', item.Person, { headers: this.headers })
            .map((response: Response) => <Person>response.json())
            .subscribe(result => {
                item.Person = result;
                isUpdate
                    ? this._store.dispatch(new PersonUpdateAction(item))
                    : this._store.dispatch(new PersonInsertAction(item))
                },
                error => { }, //TODO: call another save failed action??
                () => { } //on success
            );
    }
}