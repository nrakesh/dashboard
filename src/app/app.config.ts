import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';
// 1. Import the module and the icons
import {
  LucideAngularModule,
  Shield, BarChart3, History, Download, Menu, X,
  AlertTriangle, Activity,
  Clock,Search, ChevronUp, ChevronDown,
  Calendar, Key, Hash, FileText,
  MoreVertical, HelpCircle, Settings, Users, Database,
  Package,Lock
} from 'lucide-angular';


import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(LucideAngularModule.pick({
      Shield, BarChart3, History, Download, Menu, X,
      AlertTriangle, Activity,
      Clock,Search, ChevronUp, ChevronDown,
      Calendar, Key, Hash, FileText,
      MoreVertical, HelpCircle, Settings, Users, Database,
      Package,Lock
    }))

  ]
};
