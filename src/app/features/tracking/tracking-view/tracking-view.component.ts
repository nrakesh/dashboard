import {Component, inject, Inject} from '@angular/core';
import {TrackingInstance} from '../../../shared/models/certificate.model';
import {mockTrackingInstances} from '../../../shared/data/mockData';
import {TrackingTableComponent} from './tracking-table/tracking-table.component';
import {ChangeDetailsComponent} from './change-details/change-details.component';
import {TRUSTSTORE_SERVICE_TOKEN} from '../../../shared/services/service-factory';
import {TruststoreServiceInterface} from '../../../shared/services/trustsore-service-interface';
import {NGXLogger} from 'ngx-logger';


@Component({
  selector: 'app-tracking-view',
  templateUrl: './tracking-view.component.html',
  imports: [
    TrackingTableComponent,
    ChangeDetailsComponent
  ],
  styleUrls: ['./tracking-view.component.scss']
})
export class TrackingViewComponent {
  // State to hold the currently selected tracking instance.
  selectedInstance: TrackingInstance | null = null;

  // The data source for the tracking table.
  instances = mockTrackingInstances;

  private logger = inject(NGXLogger);
  private truststoreService: TruststoreServiceInterface = inject(TRUSTSTORE_SERVICE_TOKEN);

  constructor() {}

  /**
   * Updates the selectedInstance state when a row is clicked in the TrackingTable.
   * @param instance The TrackingInstance that was clicked.
   */
  onInstanceClick(instance: TrackingInstance): void {
    this.selectedInstance = instance;
  }

  /**
   * Clears the selectedInstance state to close the ChangeDetails view.
   */
  onCloseDetails(): void {
   this.logger.debug('closing tracking details');
    this.selectedInstance = null;
  }
}
