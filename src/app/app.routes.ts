import { Routes } from '@angular/router';
import {CertificateListComponent} from './features/certificates/components/certificate-list/certificate-list.component';
import {DashboardComponent} from './features/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'certificates', component: CertificateListComponent }
];
