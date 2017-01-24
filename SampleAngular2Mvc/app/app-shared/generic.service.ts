import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { IGenericSearchService } from './generic-search.component';
import { IGenericItemService } from './generic-detail.component';

export interface IServiceConfiguration {
    Server: string;
    ApiUrl: string;
}

// Setup the Rest service path of your service by overriding either 'endpoint' or 'buildBaseEndpoint
//  or the constructor should be given a service configuration that reveals the full base endpoint.
//  The easiest option is to give a service configuration of the Rest app base url, and update
//  'endpoint' to be the path segment under that app base to this service.
export class GenericService<C, T> implements IGenericSearchService<C, T>, IGenericItemService<T> {
    private baseUrl: string;
    private headers: Headers;

    constructor(private _http: Http, private _configuration: IServiceConfiguration) {
        this.baseUrl = this.buildBaseEndpoint(this._configuration);

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }

    // This normally means a single path segment matching the name of type T in lower case.
    //  This is the easiest recommended Rest url customization option.
    get endpoint(): string {
        return '';
    }
    // This builds the base endpoint for all functions in this service using the configuration.
    //  this is called only once from the constructor.
    buildBaseEndpoint(config: IServiceConfiguration) {
        return this._configuration.Server + this._configuration.ApiUrl + this.endpoint;
    }
    // Builds the search Rest call url, called on each invocation of search.
    buildSearchEndpoint(config: IServiceConfiguration) {
        return this.baseUrl + '/search';
    }
    // Builds the get Rest call url, called on each invocation of get.
    buildGetEndpoint(config: IServiceConfiguration, itemId: string) {
        return this.baseUrl + '/' + itemId;
    }
    // Builds the save Rest call url, called on each invocation of save.
    buildSaveEndpoint(config: IServiceConfiguration, item: T) {
        return this.baseUrl + '/';
    }

    public transformSearch(response: Response): T[] {
        return <T[]>response.json();
    }

    public search(criteria: C): Observable<T[]> {
        let critJson = JSON.stringify(criteria);
        return this._http.post(this.buildSearchEndpoint(this._configuration), critJson, { headers: this.headers })
            .map((response: Response) => this.transformSearch(response))
            .catch(this.handleError);
    }
    public get(itemId: string): Observable<T> {
        return this._http.get(this.buildGetEndpoint(this._configuration, itemId))
            .map((response: Response) => <T>response.json())
            .catch(this.handleError);
    }
    public save(item: T): Observable<T> {
        let json = JSON.stringify(item);
        return this._http.post(this.buildSaveEndpoint(this._configuration, item), json, { headers: this.headers })
            .map((response: Response) => <T>response.json())
            .catch(this.handleError);
    }

    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
