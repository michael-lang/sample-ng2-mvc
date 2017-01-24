import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonComponent } from './person.component';

const routes: Routes = [{
    path: 'person',
    component: PersonComponent,
    data: {
        headerMenu: {
            title: 'People'
        }
    }
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class PersonRoutingModule {
}
