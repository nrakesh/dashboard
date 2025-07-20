import {ErrorHandler, inject, Injectable, Injector} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import {NGXLogger} from 'ngx-logger';
import {NotificationService} from './notification.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private injector: Injector) { }

  handleError(error: Error | HttpErrorResponse) {
    const loggingService = this.injector.get(NGXLogger);
    const notificationService = this.injector.get(NotificationService);

    let message: string;
    if (error instanceof HttpErrorResponse) {
      // This is a server-side error, often handled by an HttpInterceptor.
      // But it can still be caught here if not handled elsewhere.
      message = `Server Error: ${error.status} - ${error.message}`;
    } else {
      // This is a client-side error.
      message = `Client-side Error: ${error.message}`;
    }

    // 1. Log the error to a remote service. for now we will write to console
    loggingService.error('GlobalErrorHandler caught:', message, error); // Always log to console

    // 2. Show a user-friendly notification
     notificationService.showError('An unexpected error occurred. Please try again.');
  }
}
