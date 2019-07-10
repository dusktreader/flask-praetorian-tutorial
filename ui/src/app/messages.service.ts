import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  messages: string[] = [];

  add(message: string, snack: boolean = false) {
    this.messages.push(message);
    if (snack) {
      this.snackBar.open(message, 'x', { duration: 3000 });
    }
  }

  clear() {
    this.messages = [];
  }

  getMessages(): Observable<string[]> {
    return of(this.messages);
  }

  constructor(private snackBar: MatSnackBar) {}
}
