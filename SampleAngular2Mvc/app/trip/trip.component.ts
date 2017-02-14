import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/rx';
import { Store } from '@ngrx/store';
import { Tab } from '../app-shared/tabset/tab.model';
import { Trip, TripHolder } from './trip.model';
import { AppState } from '../app.store';
import { TripCloseAction, TripOpenAction, TripTabActivateAction } from './trip.store';

@Component({
    selector: 'app-trip',
    templateUrl: '/dist/js/trip/trip.component.html'
})
export class TripComponent {
    openItems: Observable<TripHolder[]>;
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

        this.activeTabId = _store.select(x => x.trip.activeTabId);
        this.openItems = _store.select(x => x.trip.openList);
        this.tabs = this.openItems
            .combineLatest(this.activeTabId)
            .map(([people, activeId]) => {
                this.searchTab.active = activeId === this.searchTab.id || !activeId;
                return [this.searchTab].concat(people.map(item => {
                    let exists = item.Trip && item.Trip.TripId && item.Trip.TripId.length > 0;
                    let t = new Tab();
                    t.id = item.PlaceholderId;
                    t.title = exists ? item.Trip.DepartDate : 'Add Trip'; //TODO: what is a good title here??
                    t.template = 'item';
                    t.active = activeId === t.id;
                    t.closeable = true;
                    t.item = item.Trip;
                    t.itemId = item.Trip.TripId;
                    return t;
                }));
            });
    }

    closeTab(tab: Tab) {
        this._store.dispatch(new TripCloseAction(tab.id))
    }
    addTab(b: Boolean) {
        this._store.dispatch(new TripOpenAction(new Trip()));
    }
    activateTab(id: string) {
        this._store.dispatch(new TripTabActivateAction(id));
    }
}
