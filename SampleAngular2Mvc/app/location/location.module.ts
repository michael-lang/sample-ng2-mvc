import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationComponent } from './location.component';
import { LocationRoutingModule } from './location-routing.module';

@NgModule({
    imports: [
        CommonModule,
        LocationRoutingModule
    ],
    declarations: [LocationComponent]
})
export class LocationModule {
}
