import { Component } from '@angular/core';
import { LocationCriteria } from '../location.model';
import { GenericSearchFormComponent } from '../../app-shared/generic-search-form.component'

@Component({
    selector: 'location-search-form',
    templateUrl: '/dist/js/location/search/location-search-form.component.html',
})
export class LocationSearchFormComponent extends GenericSearchFormComponent<LocationCriteria> {
    public initCriteria(): LocationCriteria {
        return new LocationCriteria();
    }
}