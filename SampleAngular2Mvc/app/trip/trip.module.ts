import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripComponent } from './trip.component';
import { TripRoutingModule } from './trip-routing.module';

@NgModule({
    imports: [
        CommonModule,
        TripRoutingModule
    ],
    declarations: [TripComponent]
})
export class TripModule {
}
