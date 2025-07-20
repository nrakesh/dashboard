// app.ts
import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {LayoutComponent} from './shared/components/layout/layout.component';
import {filter, map, Subscription} from 'rxjs';
import {NGXLogger} from 'ngx-logger';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LayoutComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit, OnDestroy {

  // Use a writable signal to hold the active tab state.
  readonly activeTab = signal('dashboard');
  // Inject the Router service.
  private router = inject(Router);
  private routerSubscription!: Subscription;
  logger = inject(NGXLogger)

  ngOnInit(): void {
    // Subscribe to router events to keep the active tab in sync with the URL
    this.routerSubscription = this.router.events.pipe(
      // 1. Filter for the NavigationEnd event
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      // 2. Extract the route path (e.g., 'certificate' from '/certificate')
      map(event => event.urlAfterRedirects.split('/')[1] || 'dashboard')
    ).subscribe(path => {
      // 3. Update the signal with the current path
      this.activeTab.set(path);
      this.logger.log('Route changed, active tab is now:', path);
    });
  }

  // Method to handle the 'tabChange' event from the layout component.
  onTabChange(tab: string): void {
    this.logger.debug('App Component received tab:', tab);
    this.activeTab.set(tab);
    this.logger.debug('App Component activeTab is now:', this.activeTab());
    // Navigate to the new route that corresponds to the selected tab.
    this.router.navigate([tab]);

  }
  ngOnDestroy(): void {
    // Clean up the subscription to prevent memory leaks
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
