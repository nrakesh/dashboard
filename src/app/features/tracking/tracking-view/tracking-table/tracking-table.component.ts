import { Component, Input, Output, EventEmitter, inject, signal } from '@angular/core';
import { TrackingInstance } from '../../../../shared/models/certificate.model';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { FormsModule } from '@angular/forms';
import {
  createAngularTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnDef,
  SortingState,
  Updater, getPaginationRowModel, ColumnFiltersState,
} from '@tanstack/angular-table';
import { TRUSTSTORE_SERVICE_TOKEN } from '../../../../shared/services/service-factory';
import { TruststoreServiceInterface } from '../../../../shared/services/trustsore-service-interface';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-tracking-table',
  imports: [CommonModule, LucideAngularModule, FormsModule],
  templateUrl: './tracking-table.component.html',
  styleUrls: ['./tracking-table.component.scss']
})
export class TrackingTableComponent {
  // Use a setter for the @Input to update the signal
  @Input()
  set instances(value: TrackingInstance[]) {
    this.data.set(value);
  }

  @Output() instanceClicked = new EventEmitter<TrackingInstance>();

  private logger = inject(NGXLogger);
  private truststoreService: TruststoreServiceInterface = inject(TRUSTSTORE_SERVICE_TOKEN);

  // Internal signal to hold the data reactively
  private data = signal<TrackingInstance[]>([]);

  // Define the structure of  table
  columns: ColumnDef<TrackingInstance>[] = [
    { accessorKey: 'changeStatus', header: 'Change Status'},
    { accessorKey: 'trackingId', header: 'Tracking ID' },
    { accessorKey: 'version', header: 'Version' },
    { accessorKey: 'timestamp', header: 'Date' },
    { accessorKey: 'changesCount', header: 'Changes' },
    { accessorKey: 'description', header: 'Description' },
  ];

  // Signals to manage the table's state
  sorting = signal<SortingState>([]);
  globalFilter = signal<string>('');
  columnFilters = signal<ColumnFiltersState>([{ id: 'changeStatus', value: 'YES' }]);


  // The table instance
  table = createAngularTable(() => ({
    // The table now gets its data from the signal
    data: this.data(),
    columns: this.columns,
    state: {
      sorting: this.sorting(),
      globalFilter: this.globalFilter(),
      columnFilters: this.columnFilters(),
    },
    onSortingChange: (updater: Updater<SortingState>) => {
      this.sorting.set(typeof updater === 'function' ? updater(this.sorting()) : updater);
    },
    onColumnFiltersChange: (updater: Updater<ColumnFiltersState>) => {
      this.columnFilters.set(typeof updater === 'function' ? updater(this.columnFilters()) : updater);
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),

  }));

  onGlobalFilterChange(value: string) {
    this.globalFilter.set(value);
  }

  onStatusFilterChange(value: string) {
    // A value of 'all' or an empty string should clear the filter.
    const filterValue = value && value !== 'all' ? value : '';
    this.table.getColumn('changeStatus')?.setFilterValue(filterValue);
  }

  // Method to handle row click and emit the event
  onRowClick(instance: TrackingInstance): void {
    this.instanceClicked.emit(instance);
  }

  protected readonly Number = Number;
}
