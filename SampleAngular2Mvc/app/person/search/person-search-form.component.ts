import { Component, Input, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { PersonCriteria } from '../person.model';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'person-search-form',
    templateUrl: '/dist/js/person/search/person-search-form.component.html',
})
export class PersonSearchFormComponent implements AfterViewInit {
    @Input() criteria: PersonCriteria;
    @Output() submitSearch: EventEmitter<PersonCriteria> = new EventEmitter<PersonCriteria>();
    @Output() resetSearch: EventEmitter<void> = new EventEmitter<void>();
    @Output() criteriaChange: EventEmitter<PersonCriteria> = new EventEmitter<PersonCriteria>();
    @ViewChild('ngForm') ngForm: NgForm;
    
    ngAfterViewInit() {
        this.ngForm.form.valueChanges.subscribe(this.criteriaChange);
    }
}