import { Component, OnDestroy } from '@angular/core';
import { filter, interval, map, Observable, retry, Subscription } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [],
})
export class RxjsComponent implements OnDestroy {
  intervalSubs: Subscription;

  constructor() {
    // this.returnObs()
    //   .pipe(retry(2))
    //   .subscribe({
    //     next(value) {
    //       console.log('Subs:', value);
    //     },
    //     error(err) {
    //       console.warn(err);
    //     },
    //     complete() {
    //       console.info('Obs finished');
    //     },
    //   });
    this.intervalSubs = this.returnInterval().subscribe(console.log);
  }

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  returnInterval(): Observable<number> {
    return interval(100).pipe(
      // take(10),
      map((valor) => valor + 1), // 0 => 1
      filter((valor) => (valor % 2 === 0 ? true : false))
    );
  }

  returnObs() {
    let i = -1;
    return new Observable<number>((observer) => {
      const interval = setInterval(() => {
        i++;
        observer.next(i);

        if (i === 4) {
          clearInterval(interval);
          observer.complete();
        }

        if (i === 2) {
          i = 0;
          observer.error('value 2 has been reached');
        }
      }, 1000);
    });
  }
}
