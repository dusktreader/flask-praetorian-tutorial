import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject, Observable } from 'rxjs';

import { MessagesService } from './messages.service';

@Injectable({
  providedIn: 'root',
})
export class SectionNameService {
  baseName = 'flask-praetorian tutorial';

  private sectionNameSubject: BehaviorSubject<string> = new BehaviorSubject('');
  public readonly sectionName: Observable<
    string
  > = this.sectionNameSubject.asObservable();

  setSectionName(name: string) {
    if (name) {
      name = `${this.baseName}: ${name}`;
    } else {
      name = this.baseName;
    }

    this.messagesService.add(`Setting sectionName: ${name}`);
    this.titleService.setTitle(name);
    this.sectionNameSubject.next(name);
  }

  constructor(
    public messagesService: MessagesService,
    private titleService: Title,
  ) {}
}
