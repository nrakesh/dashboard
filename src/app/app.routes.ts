// app.routes.ts
import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import {
  CertificatesViewComponent
} from './features/certificates/components/certificate-view/certificate-view.component';
import {
  CertificateDetailsComponent
} from './features/certificates/components/certificate-view/certificate-details/certificate-details.component';
import {TrackingViewComponent} from './features/tracking/tracking-view/tracking-view.component';
import {TrackingDetailsComponent} from './features/tracking/tracking-view/tracking-details/tracking-details.component';
import {DownloadsComponent} from './features/downloads/downloads.component';

export const routes: Routes = [
  // This route will render DashboardComponent inside the router outlet when at the root URL
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'certificates', component: CertificatesViewComponent },
  { path: 'certificates/:id', component: CertificateDetailsComponent },
  { path: 'tracking', component: TrackingViewComponent },
  { path: 'tracking/:id', component: TrackingDetailsComponent },
  { path: 'download', component: DownloadsComponent },
];
