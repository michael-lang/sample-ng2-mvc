import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripComponent } from './trip.component';
import { TripRoutingModule } from './trip-routing.module';
import { AppSharedModule } from '../app-shared/app-shared.module';

@NgModule({
    imports: [
        CommonModule,
        TripRoutingModule,
        AppSharedModule
    ],
    declarations: [TripComponent]
})
export class TripModule {
}
