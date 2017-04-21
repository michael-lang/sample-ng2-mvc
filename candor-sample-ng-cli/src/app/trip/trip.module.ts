import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TripRoutingModule } from './trip-routing.module';
import { TripPageComponent } from './trip-page/trip-page.component';

@NgModule({
  imports: [
    CommonModule,
    TripRoutingModule
  ],
  declarations: [TripPageComponent]
})
export class TripModule { }
