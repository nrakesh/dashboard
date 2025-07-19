import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

import {Certificate} from '../../../../../shared/models/certificate.model';
import {CommonModule, NgClass} from '@angular/common';
import {FormsModule} from '@angular/forms';

type SortField = 'commonName' | 'issuer' | 'notAfter' | 'algorithm';
type SortDirection = 'asc' | 'desc';

@Component({
  selector: 'app-certificate-list',
  templateUrl: './certificate-list.component.html',
  imports: [CommonModule, LucideAngularModule, FormsModule],
  styleUrls: ['./certificate-list.component.scss']
})
export class CertificateListComponent {
  @Input() certificates: Certificate[] = [];
  @Output() certificateClick = new EventEmitter<Certificate>();

  searchTerm = '';
  sortField: SortField = 'commonName';
  sortDirection: SortDirection = 'asc';
  filterActive: 'all' | 'active' | 'inactive' = 'all';

  constructor() {}

  handleSort(field: SortField): void {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
  }

  isExpiringSoon(notAfter: string): boolean {
    const expiryDate = new Date(notAfter);
    const threeMonthsFromNow = new Date();
    threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);
    return expiryDate < threeMonthsFromNow;
  }

  get filteredAndSortedCertificates(): Certificate[] {
    return this.certificates
      .filter((cert) => {
        const matchesSearch =
          cert.commonName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          cert.issuer.toLowerCase().includes(this.searchTerm.toLowerCase());

        const matchesFilter =
          this.filterActive === 'all' ||
          (this.filterActive === 'active' && cert.isActive) ||
          (this.filterActive === 'inactive' && !cert.isActive);

        return matchesSearch && matchesFilter;
      })
      .sort((a, b) => {
        const aValue = a[this.sortField];
        const bValue = b[this.sortField];

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return this.sortDirection === 'asc'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        return this.sortDirection === 'asc'
          ? (aValue > bValue ? 1 : -1)
          : (aValue < bValue ? 1 : -1);
      });
  }
}
