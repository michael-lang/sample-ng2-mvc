import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocationPageComponent } from './location-page/location-page.component';

const routes: Routes = [{
    path: 'location',
    component: LocationPageComponent,
    data: {
        title: 'Locations'
    }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationRoutingModule { }
