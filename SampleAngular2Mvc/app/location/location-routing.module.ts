import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocationComponent } from './location.component';

const routes: Routes = [{
    path: 'location',
    component: LocationComponent,
    data: {
        headerMenu: {
            title: 'Locations'
        }
    }
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class LocationRoutingModule {
}
