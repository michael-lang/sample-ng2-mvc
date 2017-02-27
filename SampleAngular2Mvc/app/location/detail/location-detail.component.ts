import { Component, Input, Output, EventEmitter } from '@angular/core';
//import  * as _ from 'lodash';
import { Location, LocationHolder } from '../location.model';
import { LocationService } from '../location.service';

@Component({
    selector: 'location-detail',
    providers: [LocationService],
    templateUrl: '/dist/js/location/detail/location-detail.component.html',
})
export class LocationDetailComponent {
    private _locationHolder: LocationHolder;
    get locationHolder() { return this._locationHolder; }
    @Input() set locationHolder(locationHolder: LocationHolder) {
        this._locationHolder = JSON.parse(JSON.stringify(locationHolder)) //_.cloneDeep(locationHolder);
    }
    @Output() saveClicked: EventEmitter<LocationHolder> = new EventEmitter<LocationHolder>();

    get location() {
        return this._locationHolder.Location;
    }

    public save(): void {
        this.saveClicked.emit(this.locationHolder);
    }
}
