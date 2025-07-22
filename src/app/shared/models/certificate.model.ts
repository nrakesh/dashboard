export interface Certificate {
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
  source: string;
}

export interface TrackingInstance {
  id: string;
  trackingId: string;
  version: number;
  timestamp: string;
  changesCount: number;
  addedCount: number;
  deletedCount: number;
  description: string;
}

export interface CertificateChange {
  id: string;
  certificate: Certificate;
  action: 'added' | 'deleted';
  timestamp: string;
}

export interface DashboardStats {
  totalCertificates: number;
  activeCertificates: number;
  expiringSoon: number;
  recentChanges: number;
}

export type DownloadFormat = 'jks' | 'pkcs12' | 'pem';

export interface ChartData {
  label: string;
  value: number;
  color: string;
}
