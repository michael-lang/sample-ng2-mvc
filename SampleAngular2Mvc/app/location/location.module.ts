import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationComponent } from './location.component';
import { LocationRoutingModule } from './location-routing.module';
import { AppSharedModule } from '../app-shared/app-shared.module';

@NgModule({
    imports: [
        CommonModule,
        LocationRoutingModule,
        AppSharedModule
    ],
    declarations: [LocationComponent]
})
export class LocationModule {
}
