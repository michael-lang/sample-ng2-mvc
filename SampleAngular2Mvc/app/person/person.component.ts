import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/rx';
import { Store } from '@ngrx/store';
import { Tab } from '../app-shared/tabset/tab.model';
import { Person, PersonHolder } from './person.model';
import { PersonService } from './person.service';
import { AppState } from '../app.store';
import { PersonCloseAction, PersonOpenAction, PersonTabActivateAction } from './person.store';

@Component({
    selector: 'app-person',
    templateUrl: '/dist/js/person/person.component.html'
})
export class PersonComponent {
    openItems$: Observable<PersonHolder[]>;
    tabs$: Observable<Tab[]>;
    activeTabId$: Observable<string>;
    searchTab: Tab;

    constructor(private _store: Store<AppState>, private _itemService: PersonService) {
        this.searchTab = new Tab();
        this.searchTab.id = 'tab-id-search';
        this.searchTab.title = 'Search';
        this.searchTab.template = 'search';
        this.searchTab.active = true;
        this.searchTab.closeable = false;
        this.searchTab.itemId = '';

        this.activeTabId$ = _store.select(x => x.person.activeTabId);
        this.openItems$ = _store.select(x => x.person.openList);
        this.tabs$ = this.openItems$
            .combineLatest(this.activeTabId$)
            .map(([people, activeId]) => {
                this.searchTab.active = activeId === this.searchTab.id || !activeId;
                return [this.searchTab].concat(people.map(item => {
                    let exists = item.Person && item.Person.PersonId && item.Person.PersonId.length > 0;
                    let t = new Tab();
                    t.id = item.PlaceholderId;
                    t.title = exists ? item.Person.LastName + ' ' + item.Person.FirstName : 'Add Person';
                    t.template = 'item';
                    t.active = activeId === t.id;
                    t.closeable = true;
                    t.item = item;
                    t.itemId = item.Person.PersonId;
                    return t;
                }));
            });
    }

    savePerson(vh: PersonHolder) {
        this._itemService.save(vh);
    }

    closeTab(tab: Tab) {
        this._store.dispatch(new PersonCloseAction(tab.id))
    }
    addTab(b: Boolean) {
        this._store.dispatch(new PersonOpenAction(new Person()));
    }
    activateTab(id: string) {
        this._store.dispatch(new PersonTabActivateAction(id));
    }
    openItem(person: Person) {
        this._store.dispatch(new PersonOpenAction(person));
    }
}
