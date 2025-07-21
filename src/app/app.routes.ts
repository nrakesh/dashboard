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
import {TrackingTableComponent} from './features/tracking/tracking-view/tracking-table/tracking-table.component';
import {DownloadsComponent} from './features/downloads/downloads.component';
import {authGuard} from './shared/auth/auth.guard';
import {LoginComponent} from './shared/login/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'certificates', component: CertificatesViewComponent, canActivate: [authGuard] },
  { path: 'certificates/:id', component: CertificateDetailsComponent, canActivate: [authGuard] },
  { path: 'tracking', component: TrackingViewComponent, canActivate: [authGuard] },
  { path: 'tracking/:id', component: TrackingTableComponent, canActivate: [authGuard] },
  { path: 'download', component: DownloadsComponent},
];
