import { Component } from '@angular/core';
import { TabSetGenericPageComponent } from '../app-shared/tabset/tabset-generic-page.component';
import { Trip } from './trip.model';

@Component({
    selector: 'app-trip',
    templateUrl: '/dist/js/trip/trip.component.html'
})
export class TripComponent extends TabSetGenericPageComponent<Trip > {
    constructor() {
        super();
    }

    getUniqueId(item: Trip): string {
        return item.tripId;
    }
    getTitle(item: Trip): string {
        return item.departDate; //TODO: what is a good tab title for a trip?
    }
    getTitleOfNew(): string {
      return 'New Trip';
    }
}
