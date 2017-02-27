import { Component, Input, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { LocationCriteria } from '../location.model';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'location-search-form',
    templateUrl: '/dist/js/location/search/location-search-form.component.html',
})
export class LocationSearchFormComponent implements AfterViewInit {
    @Input() criteria: LocationCriteria;
    @Output() submitSearch: EventEmitter<LocationCriteria> = new EventEmitter<LocationCriteria>();
    @Output() resetSearch: EventEmitter<void> = new EventEmitter<void>();
    @Output() criteriaChange: EventEmitter<LocationCriteria> = new EventEmitter<LocationCriteria>();
    @ViewChild('ngForm') ngForm: NgForm;

    ngAfterViewInit() {
        this.ngForm.form.valueChanges.subscribe(this.criteriaChange);
    }
}