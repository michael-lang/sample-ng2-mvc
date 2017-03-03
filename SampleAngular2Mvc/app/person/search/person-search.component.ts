import { Component, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import '@ngrx/core/add/operator/select';
import { Person, PersonCriteria } from '../person.model';
import { PersonOrchestratorService } from '../person-orchestrator.service'
import { SearchStatus } from '../person.store';

@Component({
    selector: 'person-search',
    providers: [PersonOrchestratorService],
    templateUrl: '/dist/js/person/search/person-search.component.html'
})
export class PersonSearchComponent {
    public searchStatus$: Observable<SearchStatus>;
    public criteria$: Observable<PersonCriteria>;
    public hasResults$: Observable<boolean>;
    public results$: Observable<Person[]>;
    @Output() doOpen: EventEmitter<Person> = new EventEmitter();

    constructor(private _service: PersonOrchestratorService) {
        this.searchStatus$ = this._service.searchStatus;
        this.criteria$ = this._service.criteria;
        this.hasResults$ = this._service.hasResults;
        this.results$ = this._service.results;
    }

    public criteriaReset(reset: boolean): void {
        this._service.resetSearch();
    }
    public criteriaChange(criteria: PersonCriteria): void {
        this._service.changeSearch(criteria);
    }
    public criteriaSubmitted(criteria: PersonCriteria): void {
        this._service.search(criteria);
    }
    public itemSelected(item: Person) {
        this.doOpen.emit(item);
    }
}