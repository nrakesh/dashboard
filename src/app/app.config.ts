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
  Package,Lock,Plus,Minus
} from 'lucide-angular';


import { routes } from './app.routes';
import {getTruststoreServiceFactory, TRUSTSTORE_SERVICE_TOKEN} from './shared/services/service-factory';
import {LoggerModule, NgxLoggerLevel} from 'ngx-logger';

const appIcons = {
  Shield, BarChart3, History, Download, Menu, X,
  AlertTriangle, Activity,
  Clock,Search, ChevronUp, ChevronDown,
  Calendar, Key, Hash, FileText,
  MoreVertical, HelpCircle, Settings, Users, Database,
  Package,Lock,Plus,Minus
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(LucideAngularModule.pick(appIcons)),
    {
      provide: TRUSTSTORE_SERVICE_TOKEN,
      useFactory: () => getTruststoreServiceFactory(false),
    },
    importProvidersFrom(
      LoggerModule.forRoot({
        level: NgxLoggerLevel.DEBUG,
      })
    )
  ]
};
