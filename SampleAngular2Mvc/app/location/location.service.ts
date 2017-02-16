import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { tassign } from 'tassign';
import { Configuration } from '../app.constants';
import { Location, LocationHolder, LocationCriteria } from './location.model';
import { AppState } from '../app.store';
import {
    LocationState,
    LocationSearchAction,
    LocationSearchCompleteAction,
    LocationUpdateAction,
    LocationInsertAction
} from './location.store';

@Injectable()
export class LocationService {
    private baseUrl: string;
    private headers: Headers;

    constructor(private _http: Http, private _configuration: Configuration, private _store: Store<AppState>) {
        this.baseUrl = _configuration.Server + _configuration.ApiUrl + 'location';
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }

    public search(criteria: LocationCriteria) {
        this._store.dispatch(new LocationSearchAction(criteria));
        this._http.post(this.baseUrl + '/search', criteria, { headers: this.headers })
            .map((response: Response) =>
                <Location[]>response.json())
            .subscribe(payload =>
                this._store.dispatch(new LocationSearchCompleteAction(payload)),
            error => { }, //TODO: call another search failed action??
            () => { } //on complete
            );
    }
    public save(item: LocationHolder) {
        let isUpdate = item.Location.LocationId;
        return this._http.post(this.baseUrl + '/', item.Location, { headers: this.headers })
            .map((response: Response) => <Location>response.json())
            .subscribe(result => {
                item.Location = result;
                isUpdate
                    ? this._store.dispatch(new LocationUpdateAction(item))
                    : this._store.dispatch(new LocationInsertAction(item))
            },
            error => { }, //TODO: call another save failed action??
            () => { } //on complete
            );
    }
}