import { Injectable } from '@angular/core';
import {TruststoreServiceInterface} from '../trustsore-service-interface';

@Injectable({
  providedIn: 'root'
})

export class TruststoreServiceLocal implements TruststoreServiceInterface {

  ping(): string {
      return 'ack';
  }

}
