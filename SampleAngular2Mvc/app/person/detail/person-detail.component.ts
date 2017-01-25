import { Component, OnInit } from '@angular/core';
import { GenericDetailComponent } from '../../app-shared/generic-detail.component';
import { Person } from '../person.model';
import { PersonService } from '../person.service';

@Component({
    selector: 'person-detail',
    providers: [PersonService],
  templateUrl: '/dist/js/person/detail/person-detail.component.html',
})
export class PersonDetailComponent extends GenericDetailComponent<Person, PersonService> implements OnInit {
  constructor(private _personItemService: PersonService) {
    super(_personItemService);
  }
  public InitItem(): Person {
    return new Person();
  }
}
