// app.ts
import { Component, signal } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {LayoutComponent} from './shared/components/layout/layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LayoutComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  // Use a writable signal to hold the active tab state.
  readonly activeTab = signal('dashboard');
  // Inject the Router service.
  constructor(private router: Router) { }


  // Method to handle the 'tabChange' event from the layout component.
  onTabChange(tab: string): void {
    console.log('App Component received tab:', tab);
    this.activeTab.set(tab);
    console.log('App Component activeTab is now:', this.activeTab());
    // Navigate to the new route that corresponds to the selected tab.
    this.router.navigate([tab]);

  }
}
