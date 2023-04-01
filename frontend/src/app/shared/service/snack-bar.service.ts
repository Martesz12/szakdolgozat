import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root',
})
export class SnackBarService {
    constructor(private snackBar: MatSnackBar) {}

    infoSnackBar(message: string): void {
        this.snackBar.open(message, 'X', {
            duration: 2000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            panelClass: ['info-snackbar'],
        });
    }

    errorSnackBar(message: string): void {
        this.snackBar.open(message, 'X', {
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            panelClass: ['error-snackbar'],
        });
    }
}
