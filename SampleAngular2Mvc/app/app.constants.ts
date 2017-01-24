import { Injectable } from '@angular/core';
import { IServiceConfiguration } from './app-shared/generic.service'

@Injectable()
export class Configuration implements IServiceConfiguration {
    public Server: string = "http://localhost:57673/";
    public ApiUrl: string = "api/";
}