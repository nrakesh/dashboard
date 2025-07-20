// src/app/core/services/notification.service.ts
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) { }

  private createConfig(tailwindClasses: string): MatSnackBarConfig {
    return {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      // Apply the Tailwind classes directly here!
      panelClass: tailwindClasses.split(' ') // Pass as an array of strings
    };
  }

  /**
   * Shows a success notification (green)
   * @param message The message to display
   */
  public showSuccess(message: string): void {
    // Note the beautiful, descriptive utility classes
    const config = this.createConfig('bg-green-500 text-white rounded-md px-4 py-2');
    this.snackBar.open(message, 'Close', config);
  }

  /**
   * Shows an error notification (red)
   * @param message The message to display
   */
  public showError(message: string): void {
    const config = this.createConfig('bg-red-600 text-white rounded-md px-4 py-2');
    this.snackBar.open(message, 'Close', config);
  }

  /**
   * Shows an informational notification (blue)
   * @param message The message to display
   */
  public showInfo(message: string): void {
    const config = this.createConfig('bg-blue-500 text-white rounded-md px-4 py-2');
    this.snackBar.open(message, 'Close', config);
  }
}
