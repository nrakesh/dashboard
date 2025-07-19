import { Routes } from '@angular/router';
import {DashboardComponent} from './features/dashboard/dashboard.component';
import {
  CertificatesViewComponent
} from './features/certificates/components/certificate-view/certificate-view.component';
import {
  CertificateDetailsComponent
} from './features/certificates/components/certificate-view/certificate-details/certificate-details.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'certificates', component: CertificatesViewComponent },
  { path: 'certificates/:id', component: CertificateDetailsComponent },

];
