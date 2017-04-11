import { Component, Input, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
//import  * as _ from 'lodash';
import { Person, PersonHolder } from '../person.model';
import { PersonService } from '../person.service';

@Component({
    selector: 'person-detail',
    providers: [PersonService],
    templateUrl: '/dist/js/person/detail/person-detail.component.html',
})
export class PersonDetailComponent {
    @Input() personHolder: PersonHolder;    
    @Output() saveClicked: EventEmitter<PersonHolder> = new EventEmitter<PersonHolder>();

    get person() {
        return this.personHolder.Person;
    }

    save(person: Person) {
        let v = Object.assign({}, this.personHolder, {
            Person: Object.assign({}, this.personHolder.Person, person)
        });
        this.saveClicked.emit(v);
    }
}
