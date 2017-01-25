import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Configuration } from '../app.constants';
import { GenericService } from '../app-shared/generic.service'
import { Location, LocationCriteria } from './location.model';

@Injectable()
export class LocationService extends GenericService<LocationCriteria, Location> {
    constructor(_http: Http, _configuration: Configuration) {
        super(_http, _configuration)
    }
    get endpoint(): string {
        return 'location';
    }
}