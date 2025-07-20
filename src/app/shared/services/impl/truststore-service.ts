import { Injectable } from '@angular/core';
import {TruststoreServiceInterface} from '../trustsore-service-interface';

@Injectable({
  providedIn: 'root'
})

export class TrustStoreService implements TruststoreServiceInterface {

  ping(): string {
      throw new Error('Method not implemented.');
  }

}
