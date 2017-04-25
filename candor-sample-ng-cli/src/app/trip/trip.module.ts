import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from '../app-common/app-common.module';

import { TripRoutingModule } from './trip-routing.module';
import { TripPageComponent } from './trip-page/trip-page.component';

@NgModule({
  imports: [
    CommonModule,
    AppCommonModule,
    TripRoutingModule
  ],
  declarations: [TripPageComponent],
  exports: [
      TripPageComponent
  ]
})
export class TripModule { }
