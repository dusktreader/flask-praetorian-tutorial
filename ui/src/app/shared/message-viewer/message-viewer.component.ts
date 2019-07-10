import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../../messages.service';

@Component({
  selector: 'app-message-viewer',
  templateUrl: './message-viewer.component.html',
  styleUrls: ['./message-viewer.component.scss'],
})
export class MessageViewerComponent implements OnInit {
  messages: string[] = [];
  constructor(public messagesService: MessagesService) {}

  ngOnInit() {
    this.messagesService
      .getMessages()
      .subscribe(messages => (this.messages = messages));
  }
}
