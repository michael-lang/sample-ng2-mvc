import { Input, Output, EventEmitter } from '@angular/core';

export class GenericSearchResultsComponent<T> {
    @Input() public displayResults: T[];
    @Output() onItemSelected: EventEmitter<T> = new EventEmitter<T>();

    constructor() { }

    public resultCount(): number {
        return this.displayResults && this.displayResults.length ? this.displayResults.length : 0;
    }
    public itemSelected(item: T): void {
        console.log('item selected ' + item);
        this.onItemSelected.emit(item);
    }
}