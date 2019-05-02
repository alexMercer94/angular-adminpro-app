import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {
  porcent1 = 20;
  porcent2 = 30;

  constructor() {}

  ngOnInit() {}

  /* updateProgress(event: number) {
    console.log('Event: ', event);
  } */
}
