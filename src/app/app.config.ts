import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

const hostApi = process.env.NODE_ENV === 'development' ? 'http://localhost' : 'http://localhost:5000';
const portApi = process.env.NODE_ENV === 'development' ? '5000' : '';
const baseURLApi = `${hostApi}${portApi ? `:${portApi}` : ``}`;

@Injectable({
  providedIn: 'root'
})
export class AppConfig {

  config = {
    version: '1.2.0',
    remote: environment.backendUrl,
    isBackend: environment.backend,
    hostApi,
    portApi,
    baseURLApi,
    auth: {
      email: 'admin@consulat-congo.com',
      password: 'admin123+'
    },
  };

  constructor() {
  }

  getConfig(): Object {
    return this.config;
  }
}
