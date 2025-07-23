import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { Certificate } from '../../../../../shared/models/certificate.model';
import {
  createAngularTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  Updater,
} from '@tanstack/angular-table';

// Other Imports
import { LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-certificate-list',
  templateUrl: './certificate-list.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  styleUrls: ['./certificate-list.component.scss']
})
export class CertificateListComponent {
  @Input({ required: true }) certificates: Certificate[] = [];
  @Output() certificateClick = new EventEmitter<Certificate>();

  sorting = signal<SortingState>([]);
  globalFilter = signal<string>('');
  columnFilters = signal<ColumnFiltersState>([]);

  isExpiringSoon(notAfter: string): boolean {
    const expiryDate = new Date(notAfter);
    const threeMonthsFromNow = new Date();
    threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);
    return expiryDate < threeMonthsFromNow;
  }

  columns: ColumnDef<Certificate>[] = [
    { accessorKey: 'source', header: 'Source' },
    { accessorKey: 'commonName', header: 'Common Name' },
    { accessorKey: 'issuer', header: 'Issuer' },
    { accessorKey: 'notAfter', header: 'Expires' },
    { accessorKey: 'algorithm', header: 'Algorithm' },
  ];

  table = createAngularTable(() => ({
    data: this.certificates,
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

  onSourceFilterChange(value: string) {
    // A value of 'all' or an empty string should clear the filter.
    const filterValue = value && value !== 'all' ? value : '';
    this.table.getColumn('source')?.setFilterValue(filterValue);
  }

  protected readonly Number = Number;
}
