import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppChromeModule } from './app-chrome/app-chrome.module';
import { LocationModule } from './location/location.module';
import { PersonModule } from './person/person.module';
import { TripModule } from './trip/trip.module';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        AppChromeModule,
        LocationModule,
        PersonModule,
        TripModule,
        RouterModule.forRoot([{
            path: '', redirectTo: '/trip', pathMatch: 'full'
        }])
    ],
    declarations: [
        AppComponent
    ],
    exports: [RouterModule], //Don't export AppModule (this class), it causes '(SystemJS) Maximum call stack size exceeded'
    bootstrap: [AppComponent]
})
export class AppModule {
}

const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);