import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
})
export class ProgressComponent {
  progress1 = 25;
  progress2 = 35;

  get percentage1() {
    return `${this.progress1}%`;
  }
  get percentage2() {
    return `${this.progress2}%`;
  }
}
