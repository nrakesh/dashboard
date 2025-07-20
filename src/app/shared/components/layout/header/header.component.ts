import {Component, Input, Output, EventEmitter, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LucideAngularModule} from 'lucide-angular';
import {NGXLogger} from 'ngx-logger';

@Component({
  selector: 'app-header',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements  OnInit {
  @Input() activeTab!: string;
  @Output() tabChange = new EventEmitter<string>();

  isMobileMenuOpen = false;
  isHamburgerMenuOpen = false;
  isAdminSubmenuOpen = false;
  logger = inject(NGXLogger)

  navigation = [
    { id: 'dashboard', name: 'Dashboard', icon: 'bar-chart-3' },
    { id: 'certificates', name: 'Certificates', icon: 'shield' },
    { id: 'tracking', name: 'Tracking', icon: 'history' },
    { id: 'download', name: 'Download', icon: 'download' },
  ];

  ngOnInit(): void {
    this.logger.debug('Header Component is initializing...');
  }

  handleMenuItemClick(action: string): void {
    this.logger.debug(`Menu action: ${action}`);
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
    this.logger.debug(`Tab in header ${tab}`);
    this.tabChange.emit(tab);
    this.isMobileMenuOpen = false;
  }
}
