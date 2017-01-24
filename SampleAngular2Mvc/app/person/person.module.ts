import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppSharedModule } from '../app-shared/app-shared.module';
import { Configuration } from '../app.constants';

import { PersonComponent } from './person.component';
import { PersonRoutingModule } from './person-routing.module';
import { PersonSearchComponent } from './search/person-search.component';
import { PersonSearchResultsComponent } from './search/person-search-results.component';
import { PersonSearchFormComponent } from './search/person-search-form.component';
import { PersonService } from './person.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        PersonRoutingModule,
        AppSharedModule
    ],
    providers: [Configuration, PersonService],
    exports: [PersonComponent,
        PersonSearchComponent,
        PersonSearchResultsComponent,
        PersonSearchFormComponent
    ],
    declarations: [PersonComponent,
        PersonSearchComponent,
        PersonSearchResultsComponent,
        PersonSearchFormComponent
    ]
})
export class PersonModule {
}
