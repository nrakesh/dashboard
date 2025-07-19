import { Routes } from '@angular/router';
import {DashboardComponent} from './features/certificates/components/dashboard/dashboard.component';
import {CertificateListComponent} from './features/certificates/components/certificate-list/certificate-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'certificates', component: CertificateListComponent }
];
