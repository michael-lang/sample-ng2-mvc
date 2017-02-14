import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { Location, LocationHolder, LocationCriteria } from '../location.model';
import { LocationService } from '../location.service'
import { AppState } from '../../app.store';
import { LocationState, LocationOpenAction, LocationSearchAction } from '../location.store';

@Component({
    selector: 'location-search',
    providers: [LocationService],
    templateUrl: '/dist/js/location/search/location-search.component.html'
})
export class LocationSearchComponent {
    results: Observable<Location[]>;
    searching: Observable<boolean>;
    hasResults: Observable<boolean>;

    constructor(private _service: LocationService, private _store: Store<AppState>) {
        this.results = _store.select(x => x.location.results);
        this.searching = _store.select(x => x.location.isSearching);
        this.hasResults = _store.select(x => x.location.hasResults);
    }

    public criteriaReset(reset: boolean): void {
        this._store.dispatch(new LocationSearchAction(new LocationCriteria()));
    }
    public criteriaSubmitted(criteria: LocationCriteria): void {
        this._service.search(criteria);
    }
    public itemSelected(item: Location) {
        this._store.dispatch(new LocationOpenAction(item));
    }
}