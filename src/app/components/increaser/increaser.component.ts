import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-increaser',
  templateUrl: './increaser.component.html',
  styles: [],
})
export class IncreaserComponent {
  @Input()
  progress = 10;
  @Input()
  btnColor = 'btn-primary'

  @Output()
  newValue = new EventEmitter<number>();

  changeValue(value: number) {
    if (this.progress >= 100 && value >= 0) {
      this.progress = 100;
      this.newValue.emit(100);
      return;
    }

    if (this.progress <= 0 && value <= 0) {
      this.progress = 0;
      this.newValue.emit(0);
      return;
    }
    this.progress = this.progress + value;
    this.newValue.emit(this.progress);
  }

  onChange(value: number) {
    if (value >= 100) {
      this.progress = 100;
    } else if (value <= 0) {
      this.progress = 0;
    } else {
      this.progress = value;
    }
    this.newValue.emit(value);
  }
}
