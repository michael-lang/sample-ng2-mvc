import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { Tab } from '../app-shared/tabset/tab.model';
import { Person, PersonHolder } from './person.model';
import { AppState } from '../app.store';
import { PersonCloseAction, PersonOpenAction } from './person.store';

@Component({
    selector: 'app-person',
    templateUrl: '/dist/js/person/person.component.html'
})
export class PersonComponent {
    openItems: Observable<PersonHolder[]>;
    nextNewId = 0;
    tabs: Observable<Tab[]>;
    searchTab: Tab;
    activeTabId: string;

    constructor(private _store: Store<AppState>) {
        this.searchTab = new Tab();
        this.searchTab.id = 'tab-id-search';
        this.searchTab.title = 'Search';
        this.searchTab.template = 'search';
        this.searchTab.active = true;
        this.searchTab.closeable = false;
        this.searchTab.itemId = '';
        
        this.openItems = _store.select(x => x.person.openList);
        this.tabs = this.openItems
            .map(people => [this.searchTab].concat(people.map(item => {
                let exists = item.Person && item.Person.PersonId && item.Person.PersonId.length > 0;
                let t = new Tab();
                t.id = item.PlaceholderId;
                t.title = exists ? item.Person.LastName + ' ' + item.Person.FirstName : 'Add Person';
                t.template = 'item';
                t.active = this.activeTabId === item.PlaceholderId;
                t.closeable = true;
                t.item = item.Person;
                t.itemId = item.Person.PersonId;
                return t;
            })));
    }

    closeTab(tab: Tab) {
        this._store.dispatch(new PersonCloseAction(tab.id))
    }
    addTab(b: Boolean) {
        this._store.dispatch(new PersonOpenAction(new Person()));
    }
}
