import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    LucideAngularModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isMobileMenuOpen = false;

  // We use strings for routerLink and icon names
  navigation = [
    { id: 'dashboard', name: 'Dashboard', link: '/dashboard', icon: 'bar-chart-3' },
    { id: 'certificates', name: 'Certificates', link: '/certificates', icon: 'shield' },
    { id: 'tracking', name: 'Tracking', link: '/tracking', icon: 'history' }, // Note: You'll need to create this page later
    { id: 'download', name: 'Download', link: '/download', icon: 'download' },
  ];

  ngOnInit(): void {
    console.log('Header component is initializing...');
    console.log('Navigation Data:', this.navigation);
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }
}
