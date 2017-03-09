import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/rx';
import { Store } from '@ngrx/store';
import { tassign } from 'tassign'; //improvement over Object.assign

import { Tab } from '../app-shared/tabset/tab.model';
import { LocationService } from './location.service';
import { Location, LocationHolder, LocationCriteria } from './location.model';
import { AppState } from '../app.store';
import {
    SearchStatus,
    LocationSearchAction, LocationSearchCompleteAction,
    LocationSearchResetAction, LocationSearchCriteriaChangeAction,
    LocationTabActivateAction, LocationOpenAction, LocationCloseAction,
    LocationInsertCompleteAction, LocationUpdateCompleteAction
} from './location.store';

/**
 * Orchestrates the interactions with the REST API, business logic, and access to the local store.
 * All in one place to ease unit testing and centralize logic for DRY code.
 */
@Injectable()
export class LocationOrchestratorService {
    constructor(private _store: Store<AppState>, private _itemService: LocationService) { }

    get criteria(): Observable<LocationCriteria> {
        return this._store.select((s: AppState) => s.location.criteria);
    }
    get searchStatus(): Observable<SearchStatus> {
        return this._store.select((s: AppState) => s.location.searchStatus);
    }
    get hasResults(): Observable<boolean> {
        return this.searchStatus.select((s: SearchStatus) => s === 'complete' || s === 'empty');
    }
    get results(): Observable<Location[]> {
        return this._store.select((s: AppState) => s.location.results);
    }
    get openList(): Observable<LocationHolder[]> {
        return this._store.select((s: AppState) => s.location.openList);
    }
    get activeTabId(): Observable<string> {
        return this._store.select((s: AppState) => s.location.activeTabId);
    }

    get tabs(): Observable<Tab[]> {
        let searchTab = new Tab();
        searchTab.id = 'tab-id-search';
        searchTab.title = 'Search';
        searchTab.template = 'search';
        searchTab.active = true;
        searchTab.closeable = false;
        searchTab.itemId = '';
        return this.openList
            .combineLatest(this.activeTabId)
            .map(([locations, activeId]) => {
                searchTab.active = activeId === searchTab.id || !activeId;
                return [searchTab].concat(locations.map(item => {
                    let exists = item.Location && item.Location.LocationId && item.Location.LocationId.length > 0;
                    let t = new Tab();
                    t.id = item.PlaceholderId;
                    t.title = exists ? item.Location.Name : 'Add Location';
                    t.template = 'item';
                    t.active = activeId === t.id;
                    t.closeable = true;
                    t.item = item;
                    t.itemId = item.Location.LocationId;
                    return t;
                }));
            });
    }

    public search(criteria: LocationCriteria): void {
        this._store.dispatch(new LocationSearchAction(criteria));
        this._itemService
            .search(criteria)
            .subscribe(
            (locations: Location[]) => { this._store.dispatch(new LocationSearchCompleteAction(locations)); },
            error => console.log(error)
            );
    }

    public resetSearch() {
        this._store.dispatch(new LocationSearchResetAction());
    }
    public changeSearch(criteria: LocationCriteria) {
        this._store.dispatch(new LocationSearchCriteriaChangeAction(criteria));
    }

    public add() {
        this._store.dispatch(new LocationOpenAction(new Location()));
    }
    public activate(placeholderId: string) {
        this._store.dispatch(new LocationTabActivateAction(placeholderId));
    }
    public close(placeholderId: string) {
        this._store.dispatch(new LocationCloseAction(placeholderId));
    }

    public open(location: Location) {
        this._store.dispatch(new LocationOpenAction(location));
    }

    public save(vh: LocationHolder) {
        this._itemService.save(vh.Location)
            .subscribe((v) => {
                if (vh.isNew) {
                    this._store.dispatch(new LocationInsertCompleteAction(tassign(vh, { Location: v })));
                } else {
                    this._store.dispatch(new LocationUpdateCompleteAction(tassign(vh, { Location: v })));
                }
            });
    }
}