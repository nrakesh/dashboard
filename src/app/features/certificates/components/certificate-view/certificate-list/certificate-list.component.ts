import { Component, Input, Output, EventEmitter } from '@angular/core';
import {DatabaseIcon, KeyRound, LucideAngularModule, ShieldCheck, ShieldQuestion, Vault} from 'lucide-angular';
import { Certificate } from '../../../../../shared/models/certificate.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type SortField = 'source' | 'commonName' | 'issuer' | 'notAfter' | 'algorithm';
type SortDirection = 'asc' | 'desc';

const sourceInfo: { [key: string]: { name: string; icon: string; colorClass: string; } } = {
  'CCADB': { name: 'CCADB', icon: 'ShieldCheck', colorClass: 'text-blue-600' },
  'AWS RDS': { name: 'AWS RDS', icon: 'DatabaseIcon', colorClass: 'text-orange-500' },
  'Venafi': { name: 'Venafi', icon: 'KeyRound', colorClass: 'text-purple-600' },
  'Vault': { name: 'Vault', icon: 'vault', colorClass: 'text-indigo-700' },
  'default': { name: 'Unknown', icon: 'ShieldQuestion', colorClass: 'text-gray-400' }
};
@Component({
  selector: 'app-certificate-list',
  templateUrl: './certificate-list.component.html',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, FormsModule],
  styleUrls: ['./certificate-list.component.scss']
})
export class CertificateListComponent {
  @Input() certificates: Certificate[] = [];
  @Output() certificateClick = new EventEmitter<Certificate>();

  // Search, Sort, and Filter State
  searchTerm = '';
  sortField: SortField = 'commonName';
  sortDirection: SortDirection = 'asc';
  filterSource: string = 'all';
  sources: string[] = ['all', 'CCADB', 'AWS RDS', 'Venafi', 'Vault'];

  // Pagination State
  currentPage: number = 1;
  pageSize: number = 10;
  pageSizeOptions: number[] = [10, 25, 50, 100];

  // --- Getters for Derived State ---

  get filteredAndSortedCertificates(): Certificate[] {
    const filtered = this.certificates
      .filter((cert) => {
        const matchesSearch =
          cert.commonName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          cert.issuer.toLowerCase().includes(this.searchTerm.toLowerCase());
        const matchesFilter =
          this.filterSource === 'all' || cert.source === this.filterSource;
        return matchesSearch && matchesFilter;
      });

    return filtered.sort((a, b) => {
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

  get paginatedCertificates(): Certificate[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredAndSortedCertificates.slice(startIndex, startIndex + this.pageSize);
  }

  get totalPages(): number {
    if (this.filteredAndSortedCertificates.length === 0) return 1;
    return Math.ceil(this.filteredAndSortedCertificates.length / this.pageSize);
  }

  // --- Methods for State Changes ---

  resetPage(): void {
    this.currentPage = 1;
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  onPageSizeChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.pageSize = Number(selectElement.value);
    this.resetPage();
  }

  handleSort(field: SortField): void {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    this.resetPage();
  }

  // --- Helper Methods ---

  getSourceInfo(source: string): { name: string; icon: string; colorClass: string; } {
    return sourceInfo[source] || sourceInfo['default'];
  }

  isExpiringSoon(notAfter: string): boolean {
    const expiryDate = new Date(notAfter);
    const threeMonthsFromNow = new Date();
    threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);
    return expiryDate < threeMonthsFromNow;
  }
}
