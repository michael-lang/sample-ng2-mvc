import { Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx';

export interface IGenericSearchService<C, T> {
    search(criteria: C): Observable<T[]>;
}

export class GenericSearchComponent<C, T> {
    public searching: boolean = false;
    public results: T[];
    public hasResults: boolean = false;
    @Output() doOpen: EventEmitter<T> = new EventEmitter<T>();

    constructor(private _searchService: IGenericSearchService<C, T>) {}

    public criteriaReset(reset: boolean): void {
        this.searching = false;
        this.results = new Array<T>();
    }

    public criteriaSubmitted(criteria: C): void {
        this.searching = true;

        this._searchService
            .search(criteria)
            .subscribe((data: T[]) => { this.results = data; this.hasResults = data && data.length > 0; console.log(data); },
            error => console.log(error),
            () => {
                console.log('search complete');
                this.searching = false;
            });
    }
    public itemSelected(item: T) {
        console.log('item selected ' + item);
        this.doOpen.emit(item);
    }
}