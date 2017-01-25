import { Component } from '@angular/core';
import { GenericSearchComponent } from '../../app-shared/generic-search.component'
import { Person, PersonCriteria } from '../person.model';
import { PersonService } from '../person.service'

@Component({
    selector: 'person-search',
    providers: [PersonService],
    templateUrl: '/dist/js/person/search/person-search.component.html'
})
export class PersonSearchComponent extends GenericSearchComponent<PersonCriteria, Person> {
    constructor(private _personSearchService: PersonService) {
        super(_personSearchService);
    }
}