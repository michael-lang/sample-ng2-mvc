import { Component, Input } from '@angular/core';
import { Person, PersonHolder } from '../person.model';
import { PersonService } from '../person.service';

@Component({
    selector: 'person-detail',
    providers: [PersonService],
    templateUrl: '/dist/js/person/detail/person-detail.component.html',
})
export class PersonDetailComponent {
    @Input() public item: PersonHolder;

    constructor(private _itemService: PersonService) { }

    public save(): void {
        this._itemService.save(this.item);
    }
}
