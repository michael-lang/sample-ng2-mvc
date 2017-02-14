import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Tab } from './tab.model';

@Component({
    selector: 'app-tabset',
    templateUrl: '/dist/js/app-shared/tabset/tabset.component.html'
})
export class TabSetComponent {
    @Input() tabs: Tab[] = new Array<Tab>();
    @Input() showAddTabButton: boolean = false;
    @Output() onTabClosing: EventEmitter<Tab> = new EventEmitter<Tab>();
    @Output() onTabAdd: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() onTabActivated: EventEmitter<string> = new EventEmitter<string>();
    private activeTabId: string = ''; //private to help during transitions

    activateTab(tabId: string) {
        let match = this.tabs.filter(x => x.id === tabId);
        if (match.length > 0) {
            this.activeTabId = match[0].id;
        }
        this.tabs.forEach(x => x.active = (x.id === this.activeTabId));
        this.onTabActivated.emit(tabId);
    }
    addingTab() {
        this.onTabAdd.emit(true);
    }
    closingTab(tabId: string) {
        let tab = this.tabs.filter(t => t.id === tabId);
        if (tab.length > 0)
            this.onTabClosing.emit(tab[0]);
    }
}