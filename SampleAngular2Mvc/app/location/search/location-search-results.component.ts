import { Component } from '@angular/core';
import { Location } from '../location.model';
import { GenericSearchResultsComponent } from '../../app-shared/generic-search-results.component'

@Component({
    selector: 'location-search-results',
    templateUrl: '/dist/js/location/search/location-search-results.component.html',
})
export class LocationSearchResultsComponent extends GenericSearchResultsComponent<Location> { }