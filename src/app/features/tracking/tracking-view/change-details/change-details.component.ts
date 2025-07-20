import { Component, Input, Output, EventEmitter } from '@angular/core';
import {LucideAngularModule, Minus, Plus, Shield, X} from 'lucide-angular';
import {DatePipe, NgClass} from '@angular/common';
import {TrackingInstance} from '../../../../shared/models/certificate.model';

interface CertificateChange {
  id: string;
  certificate: {
    id: string;
    commonName: string;
    issuer: string;
    serialNumber: string;
    notBefore: string;
    notAfter: string;
    fingerprint: string;
    algorithm: string;
    keySize: number;
    version: number;
    isActive: boolean;
  };
  action: 'added' | 'deleted';
  timestamp: string;
}



@Component({
  selector: 'app-change-details',
  standalone: true,
  imports: [LucideAngularModule, DatePipe, NgClass],
  templateUrl: './change-details.component.html',
  styleUrl: './change-details.component.scss'
})
export class ChangeDetailsComponent {
  @Input() instance: TrackingInstance | null = null;
  @Output() onClose = new EventEmitter<void>();

  // Mock data for certificate changes
  // In a real application, this would be fetched based on instance.id
  changes: CertificateChange[] = [
    {
      id: '1',
      certificate: {
        id: '6',
        commonName: 'Sectigo RSA Domain Validation Secure Server CA',
        issuer: 'Sectigo Limited',
        serialNumber: '7d5b41cb56cc2549b1a8d8e9d5e2f5ce',
        notBefore: '2018-11-02T00:00:00Z',
        notAfter: '2030-12-31T23:59:59Z',
        fingerprint: 'a1b2c3d4e5f6789012345678901234567890abcd',
        algorithm: 'SHA256withRSA',
        keySize: 2048,
        version: 3,
        isActive: true,
      },
      action: 'added',
      timestamp: '2024-01-15T10:30:00Z',
    },
    {
      id: '2',
      certificate: {
        id: '7',
        commonName: 'GeoTrust Global CA',
        issuer: 'GeoTrust Inc.',
        serialNumber: '023456789abcdef0123456789abcdef0',
        notBefore: '2002-05-21T04:00:00Z',
        notAfter: '2022-05-21T04:00:00Z',
        fingerprint: 'fedcba0987654321fedcba0987654321fedcba09',
        algorithm: 'SHA1withRSA',
        keySize: 2048,
        version: 3,
        isActive: false,
      },
      action: 'deleted',
      timestamp: '2024-01-15T10:30:00Z',
    },
  ];

  closeComponent() {
    this.onClose.emit();
  }

  // // To use Lucide icons in the template
  // X = X;
  // Plus = Plus;
  // Minus = Minus;
  // Shield = Shield;
  // Calendar = Calendar;
  protected readonly Plus = Plus;
  protected readonly Minus = Minus;
  protected readonly Shield = Shield;
  protected readonly X = X;
}
