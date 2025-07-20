import {inject, Injectable} from '@angular/core';
import {TruststoreServiceInterface} from '../trustsore-service-interface';
import {NGXLogger} from 'ngx-logger';

@Injectable({
  providedIn: 'root'
})

export class TruststoreServiceLocal implements TruststoreServiceInterface {
  private logger = inject(NGXLogger);

  constructor() {}

  ping(): string {
    this.logger.debug('ping');
    return 'ack';
  }

}
