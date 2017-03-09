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
import { PersonDetailComponent } from './detail/person-detail.component';
import { PersonService } from './person.service';
import { PersonOrchestratorService } from './person-orchestrator.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        PersonRoutingModule,
        AppSharedModule
    ],
    providers: [Configuration, PersonService, PersonOrchestratorService],
    exports: [PersonComponent,
        PersonSearchComponent,
        PersonSearchResultsComponent,
        PersonSearchFormComponent,
        PersonDetailComponent
    ],
    declarations: [PersonComponent,
        PersonSearchComponent,
        PersonSearchResultsComponent,
        PersonSearchFormComponent,
        PersonDetailComponent
    ]
})
export class PersonModule {
}
