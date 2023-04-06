import { Injectable, Inject } from '@angular/core';
import { INACTITVITY_TOKEN } from '../tokens/inactivity.token';
import { IInactivity } from '../interfaces/inactivity.interface';
import {
  from,
  fromEvent,
  merge,
  Observable,
  Subject,
  Subscription,
} from 'rxjs';
import { bufferTime } from 'rxjs/operators';
@Injectable({ providedIn: 'root' })
export class InactivityService {
  timeout: number;
  idleActivity: Observable<any>;
  idle: Observable<any>;
  idleSubscription!: Subscription;
  private idleEvent = new Subject<boolean>();
  constructor(@Inject(INACTITVITY_TOKEN) detectInactivity: IInactivity) {
    this.timeout = detectInactivity.timeout;
    this.idleActivity = merge(
      fromEvent(window, 'mousemove'),
      fromEvent(window, 'keydown'),
      fromEvent(window, 'resize')
    );
    this.idle = from(this.idleActivity);
  }

  startWatching() {
    // parte del observador
    this.idleEvent.next(false);
    this.idleSubscription = this.idle
      .pipe(bufferTime(this.timeout))
      .subscribe((response) => {
        // significa que ninguno ha llegado en ese espacio
        if (response.length === 0) {
          console.log('user is idle');
          this.lockedSession();
        }
      });
  }
  lockedSession() {
    this.idleEvent.next(true);
    this.stopWatching();
  }
  stopWatching() {
    if (this.idleSubscription) {
      this.idleSubscription.unsubscribe();
    }
  }
  idleObservable() {
    return this.idleEvent.asObservable();
  }

  // eventos , frontEvent, documement add event listening
}
