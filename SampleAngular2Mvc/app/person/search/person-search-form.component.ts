import { Component } from '@angular/core';
import { PersonCriteria } from '../person.model';
import { GenericSearchFormComponent } from '../../app-shared/generic-search-form.component'

@Component({
    selector: 'person-search-form',
    templateUrl: '/dist/js/person/search/person-search-form.component.html',
})
export class PersonSearchFormComponent extends GenericSearchFormComponent<PersonCriteria> {
    public initCriteria(): PersonCriteria {
        return new PersonCriteria();
    }
}