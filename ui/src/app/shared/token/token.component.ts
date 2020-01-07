import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.scss'],
})
export class TokenComponent implements OnInit {
  private tokenData: any;
  private accessRemains = 0;
  private refreshRemains = 0;
  constructor() {}

  ngOnInit() {}
}
