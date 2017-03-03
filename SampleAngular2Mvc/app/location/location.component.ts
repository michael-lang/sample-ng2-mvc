import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Tab } from '../app-shared/tabset/tab.model';
import { Location, LocationHolder } from './location.model';
import { LocationOrchestratorService } from './location-orchestrator.service';

@Component({
    selector: 'app-location',
    templateUrl: '/dist/js/location/location.component.html'
})
export class LocationComponent {
    openItems$: Observable<LocationHolder[]>;
    tabs$: Observable<Tab[]>;
    activeTabId$: Observable<string>;

    constructor(private _itemService: LocationOrchestratorService) {
        this.activeTabId$ = _itemService.activeTabId;
        this.openItems$ = _itemService.openList;
        this.tabs$ = _itemService.tabs;
    }

    saveLocation(vh: LocationHolder) {
        this._itemService.save(vh);
    }

    closeTab(tab: Tab) {
        this._itemService.close(tab.id);
    }
    addTab(b: Boolean) {
        this._itemService.add();
    }
    activateTab(id: string) {
        this._itemService.activate(id);
    }
    openItem(location: Location) {
        this._itemService.open(location);
    }
}