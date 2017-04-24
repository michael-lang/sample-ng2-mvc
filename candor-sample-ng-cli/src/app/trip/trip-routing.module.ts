import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TripPageComponent } from './trip-page/trip-page.component';

const routes: Routes = [{
    path: 'trip',
    component: TripPageComponent,
    data: {
        title: 'Trip Finder'
    }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TripRoutingModule { }
