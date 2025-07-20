// certificate-details.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CertificateDetailsComponent } from './certificate-details.component';
import { LucideAngularModule } from 'lucide-angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('CertificateDetailsComponent', () => {
  let component: CertificateDetailsComponent;
  let fixture: ComponentFixture<CertificateDetailsComponent>;

  beforeEach(async () => {
    // Configure the test module to declare and import everything the component needs
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        LucideAngularModule,
        FormsModule,
        CertificateDetailsComponent // Import the standalone component directly
      ]
    }).compileComponents();

    // Create a component instance and its test environment
    fixture = TestBed.createComponent(CertificateDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger initial data binding
  });

  // --- Test Suite ---

  it('should create the component successfully', () => {
    expect(component).toBeTruthy();
  });

  // --- Tests for the isExpiringSoon() method ---

  describe('isExpiringSoon', () => {
    it('should return false for a certificate expiring far in the future', () => {
      const futureDate = new Date();
      futureDate.setFullYear(futureDate.getFullYear() + 1); // Expiring in 1 year
      const result = component.isExpiringSoon(futureDate.toISOString());
      expect(result).toBe(false);
    });

    it('should return true for a certificate expiring in the next month', () => {
      const soonDate = new Date();
      soonDate.setMonth(soonDate.getMonth() + 1); // Expiring in 1 month
      const result = component.isExpiringSoon(soonDate.toISOString());
      expect(result).toBe(true);
    });

    it('should return true for a certificate that has already expired', () => {
      const pastDate = new Date();
      pastDate.setFullYear(pastDate.getFullYear() - 1); // Expired 1 year ago
      const result = component.isExpiringSoon(pastDate.toISOString());
      expect(result).toBe(true);
    });
  });

  // --- Tests for the closeComponent() method and @Output ---

  describe('closeComponent', () => {
    it('should emit the onClose event when called', () => {
      // Spy on the 'emit' method of the onClose EventEmitter
      spyOn(component.onClose, 'emit');

      // Call the method that should trigger the event
      component.closeComponent();

      // Expect that the 'emit' method was called
      expect(component.onClose.emit).toHaveBeenCalled();
    });

    it('should not emit the onClose event without being called', () => {
      spyOn(component.onClose, 'emit');
      // We don't call closeComponent() here
      expect(component.onClose.emit).not.toHaveBeenCalled();
    });
  });
});
