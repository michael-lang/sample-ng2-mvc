import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationRoutingModule } from './location-routing.module';
import { LocationPageComponent } from './location-page/location-page.component';

@NgModule({
  imports: [
    CommonModule,
    LocationRoutingModule
  ],
  declarations: [LocationPageComponent]
})
export class LocationModule { }
