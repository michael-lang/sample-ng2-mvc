import { Injectable } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

export class MenuItem {
    path: string;
    title: string;
    icon?: string;
}

@Injectable()
export class AppToolbarService {
    activeMenuItem$: Observable<MenuItem>;

    constructor(private router: Router) {
        this.activeMenuItem$ = this.router.events
            .filter(e => e instanceof NavigationEnd)
            .map(_ => this.router.routerState.root)
            .map(route => this.lastRouteWithMenuItem(route.root));
    }
    getMenuItems(): MenuItem[] {
        return this.router.config
            .filter(route => route.data && route.data['toolbarMenu'])
            .map(route => {
                if (!route.data['toolbarMenu'].title) {
                    throw new Error('Missing title for toolbar menu route ' + route.path);
                }
                return {
                    path: route.path,
                    title: route.data['toolbarMenu'].title,
                    icon: route.data['toolbarMenu'].icon
                };
            });
    }

    private lastRouteWithMenuItem(route: ActivatedRoute): MenuItem {
        let lastMenu = undefined;
        do {
            lastMenu = this.extractMenu(route) || lastMenu;
        } while ((route = route.firstChild));

        return lastMenu;
    }
    private extractMenu(route: ActivatedRoute): MenuItem {
        return route.routeConfig && route.routeConfig.data && route.routeConfig.data['toolbarMenu'];
    }
}


