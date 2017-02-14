import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/rx';
import { Store } from '@ngrx/store';
import { Tab } from '../app-shared/tabset/tab.model';
import { Location, LocationHolder } from './location.model';
import { AppState } from '../app.store';
import { LocationCloseAction, LocationOpenAction, LocationTabActivateAction } from './location.store';

@Component({
    selector: 'app-location',
    templateUrl: '/dist/js/location/location.component.html'
})
export class LocationComponent {
    openItems: Observable<LocationHolder[]>;
    tabs: Observable<Tab[]>;
    activeTabId: Observable<string>;
    searchTab: Tab;

    constructor(private _store: Store<AppState>) {
        this.searchTab = new Tab();
        this.searchTab.id = 'tab-id-search';
        this.searchTab.title = 'Search';
        this.searchTab.template = 'search';
        this.searchTab.active = true;
        this.searchTab.closeable = false;
        this.searchTab.itemId = '';

        this.activeTabId = _store.select(x => x.location.activeTabId);
        this.openItems = _store.select(x => x.location.openList);
        this.tabs = this.openItems
            .combineLatest(this.activeTabId)
            .map(([people, activeId]) => {
                this.searchTab.active = activeId === this.searchTab.id || !activeId;
                return [this.searchTab].concat(people.map(item => {
                    let exists = item.Location && item.Location.LocationId && item.Location.LocationId.length > 0;
                    let t = new Tab();
                    t.id = item.PlaceholderId;
                    t.title = exists ? item.Location.Name : 'Add Location';
                    t.template = 'item';
                    t.active = activeId === t.id;
                    t.closeable = true;
                    t.item = item.Location;
                    t.itemId = item.Location.LocationId;
                    return t;
                }));
            });
    }

    closeTab(tab: Tab) {
        this._store.dispatch(new LocationCloseAction(tab.id))
    }
    addTab(b: Boolean) {
        this._store.dispatch(new LocationOpenAction(new Location()));
    }
    activateTab(id: string) {
        this._store.dispatch(new LocationTabActivateAction(id));
    }
}