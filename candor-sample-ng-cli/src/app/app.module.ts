import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { //only import the portions you will use to optimize build (MaterialModule to include all is deprecated)
    MdAutocompleteModule,
    MdCoreModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdCardModule,
    MdCheckboxModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdMenuModule,
    MdProgressSpinnerModule,
    MdRadioModule,
    MdRippleModule,
    MdSelectModule,
    MdSidenavModule,
    MdSlideToggleModule,
    MdSnackBarModule,
    MdTabsModule,
    MdToolbarModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppToolbarService } from './app-toolbar/app-toolbar.service';
import { TripModule } from './trip/trip.module';
import { TripRoutingModule } from './trip/trip-routing.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        MdAutocompleteModule,
        MdCoreModule,
        MdButtonModule,
        MdButtonToggleModule,
        MdCardModule,
        MdCheckboxModule,
        MdIconModule,
        MdInputModule,
        MdListModule,
        MdMenuModule,
        MdProgressSpinnerModule,
        MdRadioModule,
        MdRippleModule,
        MdSelectModule,
        MdSidenavModule,
        MdSlideToggleModule,
        MdSnackBarModule,
        MdToolbarModule,
        MdTabsModule,
        FlexLayoutModule,
        AppRoutingModule,
        TripModule,
        TripRoutingModule,
        RouterModule.forRoot([{
            path: '', redirectTo: '/trip', pathMatch: 'full'
        }])
    ],
    providers: [AppToolbarService],
    bootstrap: [AppComponent]
})
export class AppModule { }
