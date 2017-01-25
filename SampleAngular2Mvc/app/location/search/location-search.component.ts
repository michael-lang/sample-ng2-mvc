import { Component } from '@angular/core';
import { GenericSearchComponent } from '../../app-shared/generic-search.component'
import { Location, LocationCriteria } from '../location.model';
import { LocationService } from '../location.service'

@Component({
    selector: 'location-search',
    providers: [LocationService],
    templateUrl: '/dist/js/location/search/location-search.component.html'
})
export class LocationSearchComponent extends GenericSearchComponent<LocationCriteria, Location> {
    constructor(private _locationSearchService: LocationService) {
        super(_locationSearchService);
    }
}