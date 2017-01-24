import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonComponent } from './person.component';
import { PersonRoutingModule } from './person-routing.module';
import { AppSharedModule } from '../app-shared/app-shared.module';

@NgModule({
    imports: [
        CommonModule,
        PersonRoutingModule,
        AppSharedModule
    ],
    declarations: [PersonComponent]
})
export class PersonModule {
}
