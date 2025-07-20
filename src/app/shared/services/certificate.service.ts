import {inject, Inject, Injectable} from '@angular/core';
import {NGXLogger} from 'ngx-logger';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {
  private logger = inject(NGXLogger);

  constructor() {}

  /*
  private mockCertificates: Certificate[] = [
    {
      id: '1',
      serialNumber: '00A1B2C3D4E5F6',
      subject: 'CN=DigiCert Global Root CA, OU=www.digicert.com, O=DigiCert Inc, C=US',
      issuer: 'CN=DigiCert Global Root CA, OU=www.digicert.com, O=DigiCert Inc, C=US',
      notBefore: new Date('2006-11-10').toDateString(),
      notAfter: new Date('2031-11-10').toDateString(),
      fingerprint: 'A8985D3A65E5E5C4B2D7D66D40C6DD2FB19C5436',
      keyUsage: ['keyCertSign', 'cRLSign'],
      publicKeyAlgorithm: 'RSA 2048 bits',
      signatureAlgorithm: 'SHA-1 with RSA',
      version: 3,
      status: 'active',
      commonName: '',
      algorithm: '',
      keySize: 0,
      isActive: true
    },
    {
      id: '2',
      serialNumber: '0C:07:A1:CA:6F:E2:99:C1',
      subject: 'CN=GlobalSign Root CA, OU=Root CA, O=GlobalSign nv-sa, C=BE',
      issuer: 'CN=GlobalSign Root CA, OU=Root CA, O=GlobalSign nv-sa, C=BE',
      notBefore: new Date('1998-09-01').toDateString(),
      notAfter: new Date('2028-01-28').toDateString(),
      fingerprint: 'B1BC968BD4F49D622AA89A81F2150152A41D829C',
      keyUsage: ['keyCertSign', 'cRLSign'],
      publicKeyAlgorithm: 'RSA 2048 bits',
      signatureAlgorithm: 'SHA-1 with RSA',
      version: 3,
      status: 'active',
      commonName: '',
      algorithm: '',
      keySize: 0,
      isActive: true
    },
    {
      id: '3',
      serialNumber: '04:00:00:00:00:01:15:4B:5A:C3:94',
      subject: 'CN=Baltimore CyberTrust Root, OU=CyberTrust, O=Baltimore, C=US',
      issuer: 'CN=Baltimore CyberTrust Root, OU=CyberTrust, O=Baltimore, C=US',
      notBefore: new Date('2000-05-12').toDateString(),
      notAfter: new Date('2025-05-12').toDateString(),
      fingerprint: 'D4DE20D05E66FC53FE1A50882C78DB2852CAE474',
      keyUsage: ['keyCertSign', 'cRLSign'],
      publicKeyAlgorithm: 'RSA 2048 bits',
      signatureAlgorithm: 'SHA-1 with RSA',
      version: 3,
      status: 'active',
      commonName: '',
      algorithm: '',
      keySize: 0,
      isActive: false
    }
  ];

  private mockInstances: TrackingInstance[] = [
    {
      id: '1',
      trackingId: 'TRK-2024-001',
      version: 1,
      timestamp: new Date('2024-01-15').toDateString(),
      description: 'Added new DigiCert certificates',
      certsAdded: 2,
      certsDeleted: 0,
      addedCertificates: [this.mockCertificates[0]],
      deletedCertificates: []
    },
    {
      id: '2',
      trackingId: 'TRK-2024-002',
      version: 2,
      //timestamp: new Date('2024-02-01'),
      description: 'Removed expired VeriSign certificates',
      certsAdded: 0,
      certsDeleted: 1,
      addedCertificates: [],
      deletedCertificates: []
    }
  ];

  getCertificates(): Observable<Certificate[]> {
    return of(this.mockCertificates);
  }

  getCertificateById(id: string): Observable<Certificate | undefined> {
    return of(this.mockCertificates.find(cert => cert.id === id));
  }

  getTruststoreInstances(): Observable<TrackingInstance[]> {
    return of(this.mockInstances);
  }

  getInstanceById(id: string): Observable<TrackingInstance | undefined> {
    return of(this.mockInstances.find(instance => instance.id === id));
  }

  getDashboardStats(): Observable<DashboardStats> {
    const stats: DashboardStats = {
      totalCertificates: this.mockCertificates.length,
      activeCertificates: this.mockCertificates.filter(c => c.status === 'active').length,
      //expiredCertificates: this.mockCertificates.filter(c => c.status === 'expired').length,
      certsByIssuer: {
        'DigiCert Inc': 25,
        'GlobalSign': 18,
        'Baltimore': 12,
        'VeriSign': 8,
        'Others': 15
      },
      certsByExpiryYear: {
        '2025': 5,
        '2026': 12,
        '2027': 18,
        '2028': 23,
        '2029': 15,
        '2030+': 27
      }
    };
    return of(stats);
  }

  downloadTruststore(format: DownloadFormat): Observable<Blob> {
    // Mock download - in real app this would call backend
    const content = `Mock truststore content for format: ${format}`;
    const blob = new Blob([content], { type: 'application/octet-stream' });
    return of(blob);
  }

   */
}
