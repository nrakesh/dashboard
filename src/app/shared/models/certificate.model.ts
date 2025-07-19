export interface Certificate {
  id: string;
  serialNumber: string;
  subject: string;
  issuer: string;
  validFrom: Date;
  validTo: Date;
  fingerprint: string;
  keyUsage: string[];
  publicKeyAlgorithm: string;
  signatureAlgorithm: string;
  version: number;
  status: 'active' | 'expired' | 'revoked';
}

export interface TruststoreInstance {
  id: string;
  trackingId: string;
  version: number;
  timestamp: Date;
  description: string;
  certsAdded: number;
  certsDeleted: number;
  addedCertificates: Certificate[];
  deletedCertificates: Certificate[];
}

export interface DashboardStats {
  totalCertificates: number;
  activeCertificates: number;
  expiredCertificates: number;
  certsByIssuer: { [issuer: string]: number };
  certsByExpiryYear: { [year: string]: number };
}

export type TruststoreFormat = 'jks' | 'pkcs12' | 'pem';