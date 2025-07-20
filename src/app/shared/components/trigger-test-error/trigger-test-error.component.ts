import {Component, inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NGXLogger} from 'ngx-logger';

@Component({
  selector: 'app-trigger-test-error',
  imports: [],
  templateUrl: './trigger-test-error.component.html',
  styleUrl: './trigger-test-error.component.scss'
})
export class TriggerTestErrorComponent {
  private http = inject(HttpClient);
  logger = inject(NGXLogger)

  /**
   * Throws a new client-side error.
   * This will be caught by your GlobalErrorHandler.
   */
  triggerClientError(): void {
    this.logger.error('Triggering a client-side error...');
    throw new Error('This is a test client-side error!');
  }

  /**
   * Makes an API call to a non-existent endpoint.
   * This will be caught by your HttpInterceptor.
   */
  triggerHttpError(): void {
    this.logger.error('Triggering an HTTP error...');
    // This URL will almost certainly result in a 404 Not Found error.
    this.http.get('https://jsonplaceholder.typicode.com/non-existent-path')
      .subscribe({
        // The error is handled by the interceptor, so this block may not even run
        // if the interceptor doesn't re-throw the error.
        error: (err) => this.logger.error('This local subscribe error handler ran.', err),
      });
  }
}
