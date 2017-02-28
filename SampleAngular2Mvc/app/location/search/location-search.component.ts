import { Component, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import '@ngrx/core/add/operator/select';
import { Store } from '@ngrx/store';
import { Location, LocationHolder, LocationCriteria } from '../location.model';
import { LocationService } from '../location.service'
import { AppState } from '../../app.store';
import {
    LocationState, SearchStatus,
    LocationSearchAction,
    LocationSearchResetAction,
    LocationSearchCriteriaChangeAction,
    LocationOpenAction
} from '../location.store';

@Component({
    selector: 'location-search',
    providers: [LocationService],
    templateUrl: '/dist/js/location/search/location-search.component.html'
})
export class LocationSearchComponent {
    public searchStatus$: Observable<SearchStatus>;
    public criteria$: Observable<LocationCriteria>;
    public hasResults$: Observable<boolean>;
    public results$: Observable<Location[]>;
    @Output() doOpen: EventEmitter<Location> = new EventEmitter();
    
    constructor(private _service: LocationService, private _store: Store<AppState>) {
        this.searchStatus$ = _store.select(x => x.location.searchStatus);
        this.criteria$ = _store.select((s: AppState) => s.location.criteria);
        this.hasResults$ = this.searchStatus$.select((s: SearchStatus) => s === 'complete' || s === 'empty');
        this.results$ = _store.select(x => x.location.results);
    }

    public criteriaReset(reset: boolean): void {
        this._store.dispatch(new LocationSearchResetAction());
    }
    public criteriaChange(criteria: LocationCriteria): void {
        this._store.dispatch(new LocationSearchCriteriaChangeAction(criteria));
    }
    public criteriaSubmitted(criteria: LocationCriteria): void {
        this._service.search(criteria);
    }
    public itemSelected(item: Location) {
        this.doOpen.emit(item);
    }
}