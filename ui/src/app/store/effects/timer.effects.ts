import { Injectable } from '@angular/core';
import { createEffect } from '@ngrx/effects';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';


import {
  tick,
} from '@app/store/actions/timer.actions';

@Injectable()
export class TimerEffects {
  tick$ = createEffect(() => {
    return interval(1000).pipe(
      map(() => tick())
    );
  });

  constructor() {}
}
