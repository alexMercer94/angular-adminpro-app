import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: []
})
export class PromisesComponent implements OnInit {
  constructor() {
    this.countThree()
      .then(message => console.log('Finished:', message))
      .catch(error => console.error('Error: ', error));
  }

  ngOnInit() {}

  countThree(): Promise<string> {
    return new Promise((resolve, reject) => {
      let cont = 0;
      let interval = setInterval(() => {
        cont += 1;
        console.log(cont);
        if (cont === 3) {
          resolve('Listo');
          clearInterval(interval);
        }
      }, 1000);
    });
  }
}
