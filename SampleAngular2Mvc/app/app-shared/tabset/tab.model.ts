export class Tab {
    id: string;
    active: boolean = false;
    closeable: boolean = true;
    title: string;
    template: string;
    icon: string;
    itemId: string;
    item: any;

    constructor() { }
}