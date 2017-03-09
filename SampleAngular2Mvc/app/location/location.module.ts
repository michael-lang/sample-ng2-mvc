import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppSharedModule } from '../app-shared/app-shared.module';
import { Configuration } from '../app.constants';

import { LocationComponent } from './location.component';
import { LocationRoutingModule } from './location-routing.module';
import { LocationSearchComponent } from './search/location-search.component';
import { LocationSearchResultsComponent } from './search/location-search-results.component';
import { LocationSearchFormComponent } from './search/location-search-form.component';
import { LocationDetailComponent } from './detail/location-detail.component';
import { LocationService } from './location.service';
import { LocationOrchestratorService } from './location-orchestrator.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        LocationRoutingModule,
        AppSharedModule
    ],
    providers: [Configuration, LocationService, LocationOrchestratorService],
    exports: [LocationComponent,
        LocationSearchComponent,
        LocationSearchResultsComponent,
        LocationSearchFormComponent,
        LocationDetailComponent
    ],
    declarations: [LocationComponent,
        LocationSearchComponent,
        LocationSearchResultsComponent,
        LocationSearchFormComponent,
        LocationDetailComponent
    ]
})
export class LocationModule {
}
