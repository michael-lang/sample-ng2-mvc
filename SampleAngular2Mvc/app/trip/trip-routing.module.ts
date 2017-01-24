import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TripComponent } from './trip.component';

const routes: Routes = [{
    path: 'trip',
    component: TripComponent,
    data: {
        headerMenu: {
            title: 'Trips'
        }
    }
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class TripRoutingModule {
}
