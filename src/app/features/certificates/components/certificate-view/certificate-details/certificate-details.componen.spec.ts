import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CertificateDetailsComponent } from './certificate-details.component';
import { NGXLogger } from 'ngx-logger';
import { Certificate } from '../../../../../shared/models/certificate.model';

// Create a mock for NGXLogger
const mockLogger = {
  log: jest.fn(),
};

describe('CertificateDetailsComponent', () => {
  let component: CertificateDetailsComponent;
  let fixture: ComponentFixture<CertificateDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // The component is standalone, so we import it directly
      imports: [CertificateDetailsComponent],
      providers: [
        // Provide the mock logger
        { provide: NGXLogger, useValue: mockLogger },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CertificateDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Reset mocks after each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('isExpiringSoon', () => {
    it('should return true for a date that expires in less than 3 months', () => {
      const futureDate = new Date();
      futureDate.setMonth(futureDate.getMonth() + 2); // 2 months from now
      expect(component.isExpiringSoon(futureDate.toISOString())).toBe(true);
    });

    it('should return false for a date that expires in more than 3 months', () => {
      const futureDate = new Date();
      futureDate.setMonth(futureDate.getMonth() + 4); // 4 months from now
      expect(component.isExpiringSoon(futureDate.toISOString())).toBe(false);
    });

    it('should return true for a date that has already expired', () => {
      const pastDate = new Date();
      pastDate.setMonth(pastDate.getMonth() - 1); // 1 month ago
      expect(component.isExpiringSoon(pastDate.toISOString())).toBe(true);
    });
  });

  describe('closeComponent', () => {
    it('should emit the onClose event', () => {
      // Spy on the event emitter
      const emitSpy = jest.spyOn(component.onClose, 'emit');

      // Call the method
      component.closeComponent();

      // Expect the spy to have been called
      expect(emitSpy).toHaveBeenCalledTimes(1);
    });

    it('should log a message when closing', () => {
      // Call the method
      component.closeComponent();

      // Expect the mock logger's log method to have been called
      expect(mockLogger.log).toHaveBeenCalledWith('closing certificate');
    });
  });

  it('should correctly receive and handle the certificate input', () => {
    const mockCertificate: Certificate = {
      serialNumber: '12345',
      algorithm: 'alg',
      commonName: 'cn',
      fingerprint: 'fp',
      is_apple: false,
      isActive: true,
      is_google_chrome: true,
      is_microsoft: true,
      keySize: 123,
      is_mozilla:true,
      notBefore: new Date().toISOString(),
      notAfter: new Date().toISOString(),
      id: "we",
      issuer: "issuer",
      source: "source",
      version: 12312
    };

    component.certificate = mockCertificate;

    expect(component.certificate).not.toBeNull();
    expect(component.certificate?.serialNumber).toBe('12345');
  });
});
