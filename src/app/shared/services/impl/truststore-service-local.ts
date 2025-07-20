import {inject, Injectable} from '@angular/core';
import {TruststoreServiceInterface} from '../trustsore-service-interface';
import {NGXLogger} from 'ngx-logger';
import {Certificate, TrackingInstance} from '../../models/certificate.model';
import {mockCertificates, mockTrackingInstances} from '../../data/mockData';

@Injectable({
  providedIn: 'root'
})

export class TruststoreServiceLocal implements TruststoreServiceInterface {
  private logger = inject(NGXLogger);

  constructor() {
  }



  ping(): string {
    this.logger.debug('ping');
    return 'ack';
  }

  getCertificates(): Certificate[] {
    this.logger.info('getting mock certificates of length ' + mockCertificates.length);
    return mockCertificates;
  }

  getTrackingData(): TrackingInstance[] {
    this.logger.info('getting mock tracking data of length ' + mockTrackingInstances.length);
    return  mockTrackingInstances;
  }

}
