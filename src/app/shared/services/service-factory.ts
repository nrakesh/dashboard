import {TruststoreServiceInterface} from './trustsore-service-interface';
import {TrustStoreService} from './impl/truststore-service';
import {TruststoreServiceLocal} from './impl/truststore-service-local';
import {InjectionToken} from '@angular/core';

export const TRUSTSTORE_SERVICE_TOKEN =
  new InjectionToken<TruststoreServiceInterface>('TruststoreService');


export function getTruststoreServiceFactory(
  useRemote: boolean // A simple boolean to control the implementation
): TruststoreServiceInterface {
  if (useRemote) {
    // Return a new instance of the remote service
    return new TrustStoreService();
  } else {
    // Return a new instance of the local service
    return new TruststoreServiceLocal();
  }
}
