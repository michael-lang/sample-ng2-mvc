import { Component } from '@angular/core';
import { TabSetGenericPageComponent } from '../app-shared/tabset/tabset-generic-page.component';
import { Person } from './person.model';

@Component({
    selector: 'app-person',
    templateUrl: '/dist/js/person/person.component.html'
})
export class PersonComponent extends TabSetGenericPageComponent<Person> {
    constructor() {
        super();
    }

    getUniqueId(item: Person): string {
        return item.PersonId;
    }
    getTitle(item: Person): string {
        return item.LastName + ' ' + item.FirstName;
    }
    getTitleOfNew(): string {
        return 'Add Person';
    }
}
