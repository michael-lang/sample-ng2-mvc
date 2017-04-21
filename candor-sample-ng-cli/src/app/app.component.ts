import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppToolbarService, MenuItem } from './app-toolbar/app-toolbar.service';

@Component({
  selector: 'body',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    appName = 'Ride Finder';
    mainMenuItems;
    activeMenuItem$: Observable<MenuItem>;

    constructor(private toolbarService: AppToolbarService) {
        this.mainMenuItems = this.toolbarService.getMenuItems();
        this.activeMenuItem$ = this.toolbarService.activeMenuItem$;
    }
}
