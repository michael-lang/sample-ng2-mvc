import { Component } from '@angular/core';
import { Person } from '../person.model';
import { GenericSearchResultsComponent } from '../../app-shared/generic-search-results.component'

@Component({
    selector: 'person-search-results',
    templateUrl: '/dist/js/person/search/person-search-results.component.html',
})
export class PersonSearchResultsComponent extends GenericSearchResultsComponent<Person> { }