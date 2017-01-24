import { Component, OnInit, Input } from '@angular/core';
import { MenuItem, AppRouterMenuService } from './app-router-menu.service';

@Component({
  selector: 'app-header',
  templateUrl: '/dist/js/app-chrome/app-header.template.html'
})
export class AppHeaderComponent implements OnInit {
  @Input() title: string = this.title;
  menuItems: MenuItem[];

  constructor(private headerService: AppRouterMenuService) {}

  ngOnInit() {
      this.menuItems = this.headerService.getMenuItems();
  }
}
