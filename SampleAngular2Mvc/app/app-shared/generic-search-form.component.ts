import { Output, EventEmitter } from '@angular/core';

export class GenericSearchFormComponent<C> {
    public criteria: C = null;
    @Output() resetFn: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() submitFn: EventEmitter<C> = new EventEmitter<C>();

    constructor() {
        this.criteria = this.initCriteria();
    }

    public initCriteria(): C {
        return null;
    }

    public reset(): void {
        this.criteria = this.initCriteria();
        this.resetFn.emit(true);
    }

    public search(): void {
        this.submitFn.emit(this.criteria);
    }
}