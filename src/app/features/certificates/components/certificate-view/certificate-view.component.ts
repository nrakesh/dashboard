
import {Component, Inject, OnInit} from '@angular/core';
import {mockCertificates} from '../../../../shared/data/mockData';
import {Certificate} from '../../../../shared/models/certificate.model';
import {CertificateListComponent} from './certificate-list/certificate-list.component';
import {CertificateDetailsComponent} from './certificate-details/certificate-details.component';
import {TRUSTSTORE_SERVICE_TOKEN} from '../../../../shared/services/service-factory';
import {TruststoreServiceInterface} from '../../../../shared/services/trustsore-service-interface';
import {NGXLogger} from 'ngx-logger';


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

  constructor(
    @Inject(TRUSTSTORE_SERVICE_TOKEN) private truststoreService:TruststoreServiceInterface,
    private logger: NGXLogger
  ) {}

  ngOnInit(): void {
    this.certificates = this.truststoreService.getCertificates();
  }

  onCertificateClick(certificate: Certificate): void {
    this.selectedCertificate = certificate;
  }

  onCloseDetails(): void {
    this.logger.debug('closing certificate details');
    this.selectedCertificate = null;
  }
}
