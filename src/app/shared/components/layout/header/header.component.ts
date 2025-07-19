import { Component, Input, Output, EventEmitter } from '@angular/core';
import {CommonModule} from '@angular/common';
import {LucideAngularModule} from 'lucide-angular';

@Component({
  selector: 'app-header',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() activeTab!: string;
  @Output() tabChange = new EventEmitter<string>();

  isMobileMenuOpen = false;
  isHamburgerMenuOpen = false;
  isAdminSubmenuOpen = false;

  navigation = [
    { id: 'dashboard', name: 'Dashboard', icon: 'bar-chart-3' },
    { id: 'certificates', name: 'Certificates', icon: 'shield' },
    { id: 'tracking', name: 'Tracking', icon: 'history' },
    { id: 'download', name: 'Download', icon: 'download' },
  ];

  ngOnInit(): void {
    console.log('Header Component is initializing...');
  }

  handleMenuItemClick(action: string): void {
    console.log(`Menu action: ${action}`);
    this.isHamburgerMenuOpen = false;
    this.isAdminSubmenuOpen = false;
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  toggleHamburgerMenu(): void {
    this.isHamburgerMenuOpen = !this.isHamburgerMenuOpen;
  }

  toggleAdminSubmenu(): void {
    this.isAdminSubmenuOpen = !this.isAdminSubmenuOpen;
  }

  changeTab(tab: string): void {
    console.log(`Tab in header ${tab}`);
    this.tabChange.emit(tab);
    this.isMobileMenuOpen = false;
  }
}
