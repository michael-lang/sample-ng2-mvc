import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Tab } from '../app-shared/tabset/tab.model';
import { Person, PersonHolder } from './person.model';
import { PersonOrchestratorService } from './person-orchestrator.service';

@Component({
    selector: 'app-person',
    templateUrl: '/dist/js/person/person.component.html'
})
export class PersonComponent {
    openItems$: Observable<PersonHolder[]>;
    tabs$: Observable<Tab[]>;
    activeTabId$: Observable<string>;

    constructor(private _itemService: PersonOrchestratorService) {
        this.activeTabId$ = _itemService.activeTabId;
        this.openItems$ = _itemService.openList;
        this.tabs$ = _itemService.tabs;
    }

    savePerson(vh: PersonHolder) {
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
    openItem(person: Person) {
        this._itemService.open(person);
    }
}
