import { Injectable } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
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

    constructor(private router: Router, private titleService: Title) {
        this.activeMenuItem$ = this.router.events
            .filter(e => e instanceof NavigationEnd)
            .map(_ => this.router.routerState.root)
            .map(route => {
                let active = this.lastRouteWithMenuItem(route.root);
                this.titleService.setTitle(active.title);
                return active;
            });
    }
    getMenuItems(): MenuItem[] {
        return this.router.config
            .filter(route => route.data && route.data.title)
            .map(route => {
                if (!route.data.title) {
                    throw new Error('Missing title for toolbar menu route ' + route.path);
                }
                return {
                    path: route.path,
                    title: route.data.title,
                    icon: route.data.icon
                };
            });
    }

    private lastRouteWithMenuItem(route: ActivatedRoute): MenuItem {
        let lastMenu = undefined;
        do { lastMenu = this.extractMenu(route) || lastMenu; }
        while ((route = route.firstChild));
        return lastMenu;
    }
    private extractMenu(route: ActivatedRoute): MenuItem {
        let cfg = route.routeConfig;
        return cfg && cfg.data && cfg.data.title
            ? { path: cfg.path, title: cfg.data.title, icon: cfg.data.icon }
            : undefined
    }
}


