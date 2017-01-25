import { Component, OnInit } from '@angular/core';
import { GenericDetailComponent } from '../../app-shared/generic-detail.component';
import { Location } from '../location.model';
import { LocationService } from '../location.service';

@Component({
    selector: 'location-detail',
    providers: [LocationService],
  templateUrl: '/dist/js/location/detail/location-detail.component.html',
})
export class LocationDetailComponent extends GenericDetailComponent<Location, LocationService> implements OnInit {
  constructor(private _locationItemService: LocationService) {
    super(_locationItemService);
  }
  public InitItem(): Location {
    return new Location();
  }
}
