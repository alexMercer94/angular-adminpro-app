import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent implements OnInit {
  @Input() leyenda = 'Leyenda';
  @Input() porcent = 50;
  @ViewChild('txtProgress') txtProgress: ElementRef;
  @Output() valueChange: EventEmitter<number> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  /**
   * Change porcent in progress bar
   * @param num Porcent in order to apply in progress bar
   */
  changeValue(num: number): void {
    if (this.porcent >= 100 && num > 0) {
      this.porcent = 100;
      return;
    }

    if (this.porcent <= 0 && num <= 0) {
      this.porcent = 0;
      return;
    }
    this.porcent = this.porcent + num;
    this.valueChange.emit(this.porcent);
  }

  onChange(newValue: number) {
    /* let elemHtml: any = document.getElementsByName('porcent')[0];
    console.log(this.txtProgress); */
    console.log(newValue);
    if (newValue >= 100) {
      this.porcent = 100;
    } else if (newValue <= 0) {
      this.porcent = 0;
    } else {
      this.porcent = newValue;
    }
    //elemHtml.value = Number(this.porcent);
    this.txtProgress.nativeElement.value = this.porcent;
    this.valueChange.emit(this.porcent);
    this.txtProgress.nativeElement.focus();
  }
}
