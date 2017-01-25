import { Component } from '@angular/core';
import { TabSetGenericPageComponent } from '../app-shared/tabset/tabset-generic-page.component';
import { Location } from './location.model';

@Component({
    selector: 'app-location',
    templateUrl: '/dist/js/location/location.component.html'
})
export class LocationComponent extends TabSetGenericPageComponent<Location> {
    constructor() {
        super();
    }

    getUniqueId(item: Location): string {
        return item.LocationId;
    }
    getTitle(item: Location): string {
        return item.Name;
    }
    getTitleOfNew(): string {
        return 'Add Location';
    }
}