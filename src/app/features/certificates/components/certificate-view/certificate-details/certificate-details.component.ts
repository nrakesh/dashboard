import { Component, Input, Output, EventEmitter } from '@angular/core';
import {Certificate} from '../../../../../shared/models/certificate.model';
import {CommonModule} from '@angular/common';
import {LucideAngularModule} from 'lucide-angular';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-certificate-details',
  templateUrl: './certificate-details.component.html',
  imports: [CommonModule, LucideAngularModule, FormsModule],
  styleUrls: ['./certificate-details.component.scss']
})
export class CertificateDetailsComponent {
  @Input() certificate: Certificate | null = null;
  @Output() onClose = new EventEmitter<void>();

  constructor() {}

  isExpiringSoon(notAfter: string): boolean {
    const expiryDate = new Date(notAfter);
    const threeMonthsFromNow = new Date();
    threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);
    return expiryDate < threeMonthsFromNow;
  }

  closeComponent() {
    console.log('closing certificate');
    this.onClose.emit();
  }
}
