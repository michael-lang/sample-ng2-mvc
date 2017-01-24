import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export class MenuItem {
  path: string;
  title: string;
  description?: string;
}

@Injectable()
export class AppRouterMenuService {
  constructor(private router: Router) { }

  getMenuItems(): MenuItem[] {
    return this.router.config
      .filter(route => route.data && route.data['headerMenu'])
      .map(route => {
        if (!route.data['headerMenu'].title) {
          throw 'Missing title for header menu route ' + route.path;
        }
        return {
          path: route.path,
          title: route.data['headerMenu'].title,
          description: route.data['headerMenu'].description
        };
      });
  }
}
