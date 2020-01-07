import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  messages: string[] = [];

  add(message: string, snack: boolean = false) {
    console.log(message);
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
