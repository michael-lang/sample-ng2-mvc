import { Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

export interface IGenericItemService<T> {
    get(itemId: string): Observable<T>;
    save(item: T): Observable<T>;
}

export class GenericDetailComponent<T, S extends IGenericItemService<T>> implements OnInit {
    @Input() public itemId: string;
    public loading: boolean = true;
    @Input() public item: T;
    @Output() itemSaved: EventEmitter<T> = new EventEmitter<T>();

    constructor(private _itemService: S) { }

    public InitItem(): T {
        return null;
    }

    public ngOnInit(): void {
        this.loading = true;
        if (this.item) {
          return; // nothing to load.
        }

        if (this.itemId === '') {
            this.item = this.InitItem();
            this.loading = false;
        } else {
            this._itemService
                .get(this.itemId)
                .subscribe((data: T) => { this.item = data; },
                error => { console.log(error); this.item = this.InitItem(); },
                () => {
                    console.log('load item complete: ' + this.itemId);
                    this.loading = false;
                });
        }
    }

    public save(): void {
        this.loading = true;
        this._itemService
            .save(this.item)
            .subscribe((data: T) => { this.item = data; },
            error => console.log(error),
            () => {
                console.log('save item update complete: ' + this.itemId);
                this.loading = false;
                this.itemSaved.emit(this.item);
            });
    }
}
