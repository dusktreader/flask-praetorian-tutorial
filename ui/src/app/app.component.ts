import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';

import { SectionNameService } from './section-name.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private sectionNameService: SectionNameService,
  ) {}
  ngOnInit() {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
          const child = this.activatedRoute.firstChild;
          let newName: string;
          if (child && child.snapshot.data.title) {
            newName = child.snapshot.data.title;
          }
          return newName;
        }),
      )
      .subscribe((name: string) => {
        this.sectionNameService.setSectionName(name);
      });
  }
}