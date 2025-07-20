import {Component, Input, Output, EventEmitter, Inject, inject} from '@angular/core';
import {TrackingInstance} from '../../../../shared/models/certificate.model';
import {CommonModule} from '@angular/common';
import {LucideAngularModule} from 'lucide-angular';
import {FormsModule} from '@angular/forms';
import {TRUSTSTORE_SERVICE_TOKEN} from '../../../../shared/services/service-factory';
import {TruststoreServiceInterface} from '../../../../shared/services/trustsore-service-interface';
import {NGXLogger} from 'ngx-logger';

type SortField = 'timestamp' | 'version' | 'changesCount';
type SortDirection = 'asc' | 'desc';

@Component({
  selector: 'app-tracking-table',
  imports: [CommonModule, LucideAngularModule, FormsModule],
  templateUrl: './tracking-table.component.html',
  styleUrls: ['./tracking-table.component.scss']
})


export class TrackingTableComponent {
  // Inputs and Outputs
  @Input() instances: TrackingInstance[] = [];
  @Output() instanceClicked = new EventEmitter<TrackingInstance>();

  // State properties
  searchTerm: string = '';
  sortField: SortField = 'timestamp';
  sortDirection: SortDirection = 'desc';

  private logger = inject(NGXLogger);
  private truststoreService: TruststoreServiceInterface = inject(TRUSTSTORE_SERVICE_TOKEN);

  constructor() {}

  // Method to get the correct icon name for a given field
  // This is a much cleaner way to handle the logic.
  getSortIconName(field: SortField): string {
    if (this.sortField === field) {
      return this.sortDirection === 'asc' ? 'chevron-up' : 'chevron-down';
    }
    return ''; // Return an empty string if the field is not active
  }

  // Method to handle sorting
  handleSort(field: SortField): void {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'desc';
    }
  }

  // Method to handle row click and emit the event
  onRowClick(instance: TrackingInstance): void {
    this.instanceClicked.emit(instance);
  }

  // Computed property to handle filtering and sorting
  get filteredAndSortedInstances(): TrackingInstance[] {
    let filtered = this.instances.filter(instance =>
      instance.trackingId.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      instance.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    return filtered.sort((a, b) => {
      const aValue = (a as any)[this.sortField];
      const bValue = (b as any)[this.sortField];

      if (this.sortField === 'timestamp') {
        const aDate = new Date(aValue).getTime();
        const bDate = new Date(bValue).getTime();
        return this.sortDirection === 'asc' ? aDate - bDate : bDate - aDate;
      }

      const sortResult = aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      return this.sortDirection === 'asc' ? sortResult : -sortResult;
    });
  }
}
