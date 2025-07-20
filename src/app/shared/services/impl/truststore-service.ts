import {inject, Injectable} from '@angular/core';
import {TruststoreServiceInterface} from '../trustsore-service-interface';
import {NGXLogger} from 'ngx-logger';
import { Certificate, TrackingInstance} from '../../models/certificate.model';

@Injectable({
  providedIn: 'root'
})

export class TrustStoreService implements TruststoreServiceInterface {
  private logger = inject(NGXLogger);

  constructor() {
  }

  getTrackingData(): TrackingInstance[] {
        throw new Error('Method not implemented.');
    }

  getCertificates(): Certificate[] {
        throw new Error('Method not implemented.');
    }

  ping(): string {
    this.logger.debug('ping');
    return 'ping';
  }

}
