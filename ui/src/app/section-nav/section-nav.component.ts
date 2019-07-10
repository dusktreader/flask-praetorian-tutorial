import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SectionNameService } from '../section-name.service';

@Component({
  selector: 'app-section-nav',
  templateUrl: './section-nav.component.html',
  styleUrls: ['./section-nav.component.scss'],
})
export class SectionNavComponent implements OnInit {
  sectionName: string;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  constructor(
    private breakpointObserver: BreakpointObserver,
    private sectionNameService: SectionNameService,
  ) {}

  ngOnInit() {
    this.sectionNameService.sectionName.subscribe(
      name => (this.sectionName = name),
    );
  }

  changeName() {
    this.sectionNameService.setSectionName('Dummy');
  }
}
