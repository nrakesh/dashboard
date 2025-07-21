import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable, of, tap} from 'rxjs';
import {catchError} from 'rxjs/operators'; // Removed unused imports

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}
  // my side car node server
  private backendUrl = 'http://localhost:3000';
  // Use a signal to hold the current user state
  currentUser = signal<any | null>(null);
  // This function initiates the OAuth redirect flow.
  login(): void {
    window.location.href = `${this.backendUrl}/auth/login`;
  }
  // This checks the backend to see if a valid session exists.
  checkLoginStatus() {
    return this.http.get<any>(`${this.backendUrl}/api/profile`, { withCredentials: true }).pipe(
      tap(user => this.currentUser.set(user)),
      map(() => true),
      catchError(() => {
        this.currentUser.set(null);
        return of(false);
      })
    );
  }

  /*
  // Dummy login method
  login(email: string, pass: string): Observable<boolean> {
    console.log('Attempting login with:');
    console.log('Email:', email);
    console.log('Password:', pass);

    // Simulate a successful login
    const dummyUser = { displayName: email, email: email };
    this.currentUser.set(dummyUser);

    // Return an observable of 'true' to indicate success
    return of(true);
  }
*/
  isLoggedIn(): boolean {
    return this.currentUser() !== null;
  }

  // ... rest of your service
}
