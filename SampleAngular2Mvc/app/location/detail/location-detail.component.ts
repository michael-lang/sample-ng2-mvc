import { Component, Input } from '@angular/core';
import { Location, LocationHolder } from '../location.model';
import { LocationService } from '../location.service';

@Component({
    selector: 'location-detail',
    providers: [LocationService],
    templateUrl: '/dist/js/location/detail/location-detail.component.html',
})
export class LocationDetailComponent {
    @Input() public item: LocationHolder;

    constructor(private _itemService: LocationService) { }

    public save(): void {
        this._itemService.save(this.item);
    }
}
