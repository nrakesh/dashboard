import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from '../services/notification.service';

export const httpErrorInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  // Inject services you need
  const notificationService = inject(NotificationService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Log the error
      console.error('HTTP Error caught by interceptor:', error.message);

      // Show a user-friendly notification
      notificationService.showError(error.error?.message || 'An unknown server error occurred.');

      // Re-throw the error to be caught by other handlers if needed
      return throwError(() => error);
    })
  );
};
