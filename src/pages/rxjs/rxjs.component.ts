import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  constructor() {
    this.subscription = this.returnObservable().subscribe(
      num => console.log('Subs: ', num),
      error => console.error('Error: ', error),
      () => console.log('El observador termino')
    );
  }

  ngOnInit() {}

  ngOnDestroy() {
    console.log('La pagina se va a cerrar');
    this.subscription.unsubscribe();
  }

  returnObservable(): Observable<any> {
    const obs = new Observable(observer => {
      let cont = 0;
      const interval = setInterval(() => {
        cont += 1;

        const out = {
          value: cont
        };

        observer.next(out);
        // if (cont === 3) {
        //   clearInterval(interval);
        //   observer.complete();
        // }

        // if (cont === 2) {
        //   clearInterval(interval);
        //   observer.error('Auxilio');
        // }
      }, 1000);
    }).pipe(
      map((resp: any) => resp.value),
      filter((value, index) => {
        if (value % 2 === 1) {
          // Impar
          return true;
        } else {
          // Par
          return false;
        }
      })
    );

    return obs;
  }
}
