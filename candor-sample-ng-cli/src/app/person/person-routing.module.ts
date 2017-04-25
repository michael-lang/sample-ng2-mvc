import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonPageComponent } from './person-page/person-page.component';

const routes: Routes = [{
    path: 'person',
    component: PersonPageComponent,
    data: {
        title: 'People'
    }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonRoutingModule { }
