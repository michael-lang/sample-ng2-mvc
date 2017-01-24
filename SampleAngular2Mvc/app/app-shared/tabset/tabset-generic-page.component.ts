import { Tab } from './tab.model';

export class TabSetGenericPageComponent<T> {
    nextNewId = 0;
    nextTabId = 0;
    tabs: Tab[] = new Array<Tab>();

    constructor() {
        let tab = new Tab();
        tab.id = 'tab-id-search';
        tab.title = 'Search';
        tab.template = 'search';
        tab.active = true;
        tab.closeable = false;
        tab.itemId = '';
        this.tabs.push(tab);
    }

    closeTab(tab: Tab) { // referenced in view binding
        // TODO: show a dialog if this tab has dirty data
        // ...close if user says its ok
        this.tabs = this.tabs.filter(t => t.id !== tab.id);
        if (tab.active && this.tabs.length > 0) {
            this.tabs[0].active = true;
        }
    }

    addTab(b: Boolean) { // referenced in view binding
        let tab = new Tab();
        tab.id = 'tab-id-new-' + (++this.nextNewId);
        tab.title = this.getTitleOfNew() + (this.nextNewId > 1 ? ' (' + this.nextNewId + ')' : '');
        tab.template = this.getTemplate(null);
        tab.active = false;
        tab.itemId = '';
        this._openTab(tab);
    }

    openItem(item: T) {
        let tab = new Tab();
        let uid = this.getUniqueId(item);
        if (uid === '') {
            console.log('Error: Derived controller must override getUniqueId(T) and return a value.');
        }
        tab.id = 'tab-id-' + uid;
        tab.title = this.getTitle(item);
        tab.template = this.getTemplate(item);
        tab.active = false;
        tab.itemId = uid;
        tab.item = item;
        this._openTab(tab);
    }

    onItemSaved(item: T, tab: Tab) {
        tab.title = this.getTitle(item);
        let uid = this.getUniqueId(item);
        if (uid === '') {
            console.log('Error: Derived controller must override getUniqueId(T) and return a value.');
        }
        tab.id = 'tab-id-' + uid;
        tab.itemId = uid;
    }

    _openTab(tab: Tab) {
        let exists = this.tabs.filter(x => tab.id.length > 0 && x.id === tab.id);
        if (exists.length === 0) {
            this.tabs.push(tab);
        }
        this.tabs.forEach(x => x.active = (x.id === tab.id));
    }

    getUniqueId(item: T): string {
        return '';
    }

    getTitle(item: T): string {
        return 'Untitled';
    }

    getTitleOfNew(): string {
        return 'New Item';
    }

    getTemplate(item: T | null): string {
        return 'item';
    }
}
