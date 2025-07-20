
import { Component, OnInit } from '@angular/core';
import {mockCertificates} from '../../../../shared/data/mockData';
import {Certificate} from '../../../../shared/models/certificate.model';
import {CertificateListComponent} from './certificate-list/certificate-list.component';
import {CertificateDetailsComponent} from './certificate-details/certificate-details.component';


@Component({
  selector: 'app-certificates-view',
  templateUrl: './certificate-view.component.html',
  imports: [
    CertificateListComponent,
    CertificateDetailsComponent
  ],
  styleUrls: ['./certificate-view.component.scss']
})
export class CertificatesViewComponent implements OnInit {
  certificates: Certificate[] = [];
  selectedCertificate: Certificate | null = null;

  constructor() { }

  ngOnInit(): void {
    this.certificates = mockCertificates;
  }

  onCertificateClick(certificate: Certificate): void {
    this.selectedCertificate = certificate;
  }

  onCloseDetails(): void {
    console.log('closing certificate details');
    this.selectedCertificate = null;
  }
}
