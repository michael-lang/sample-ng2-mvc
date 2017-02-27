import { Component, Input, Output, EventEmitter } from '@angular/core';
//import  * as _ from 'lodash';
import { Person, PersonHolder } from '../person.model';
import { PersonService } from '../person.service';

@Component({
    selector: 'person-detail',
    providers: [PersonService],
    templateUrl: '/dist/js/person/detail/person-detail.component.html',
})
export class PersonDetailComponent {
    private _personHolder: PersonHolder;
    get personHolder() { return this._personHolder; }
    @Input() set personHolder(personHolder: PersonHolder) {
        this._personHolder = JSON.parse(JSON.stringify(personHolder)) //_.cloneDeep(personHolder);
    }
    @Output() saveClicked: EventEmitter<PersonHolder> = new EventEmitter<PersonHolder>();

    get person() {
        return this._personHolder.Person;
    }

    public save(): void {
        this.saveClicked.emit(this.personHolder);
    }
}
