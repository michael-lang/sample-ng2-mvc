import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Configuration } from '../app.constants';
import { GenericService } from '../app-shared/generic.service'
import { Person, PersonCriteria } from './person.model';

@Injectable()
export class PersonService extends GenericService<PersonCriteria, Person> {
    constructor(_http: Http, _configuration: Configuration) {
        super(_http, _configuration)
    }
    get endpoint(): string {
        return 'person';
    }
}