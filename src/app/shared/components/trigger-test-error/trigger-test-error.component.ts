import {Component, inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-trigger-test-error',
  imports: [],
  templateUrl: './trigger-test-error.component.html',
  styleUrl: './trigger-test-error.component.scss'
})
export class TriggerTestErrorComponent {
  private http = inject(HttpClient);

  /**
   * Throws a new client-side error.
   * This will be caught by your GlobalErrorHandler.
   */
  triggerClientError(): void {
    console.log('Triggering a client-side error...');
    throw new Error('This is a test client-side error!');
  }

  /**
   * Makes an API call to a non-existent endpoint.
   * This will be caught by your HttpInterceptor.
   */
  triggerHttpError(): void {
    console.log('Triggering an HTTP error...');
    // This URL will almost certainly result in a 404 Not Found error.
    this.http.get('https://jsonplaceholder.typicode.com/non-existent-path')
      .subscribe({
        // The error is handled by the interceptor, so this block may not even run
        // if the interceptor doesn't re-throw the error.
        error: (err) => console.log('This local subscribe error handler ran.', err),
      });
  }
}
