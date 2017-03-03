import { Component, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import '@ngrx/core/add/operator/select';
import { Location, LocationCriteria } from '../location.model';
import { LocationOrchestratorService } from '../location-orchestrator.service'
import { SearchStatus } from '../location.store';

@Component({
    selector: 'location-search',
    providers: [LocationOrchestratorService],
    templateUrl: '/dist/js/location/search/location-search.component.html'
})
export class LocationSearchComponent {
    public searchStatus$: Observable<SearchStatus>;
    public criteria$: Observable<LocationCriteria>;
    public hasResults$: Observable<boolean>;
    public results$: Observable<Location[]>;
    @Output() doOpen: EventEmitter<Location> = new EventEmitter();

    constructor(private _service: LocationOrchestratorService) {
        this.searchStatus$ = this._service.searchStatus;
        this.criteria$ = this._service.criteria;
        this.hasResults$ = this._service.hasResults;
        this.results$ = this._service.results;
    }

    public criteriaReset(reset: boolean): void {
        this._service.resetSearch();
    }
    public criteriaChange(criteria: LocationCriteria): void {
        this._service.changeSearch(criteria);
    }
    public criteriaSubmitted(criteria: LocationCriteria): void {
        this._service.search(criteria);
    }
    public itemSelected(item: Location) {
        this.doOpen.emit(item);
    }
}