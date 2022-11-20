import { Component } from '@angular/core';

@Component({
  selector: 'app-graphic1',
  templateUrl: './graphic1.component.html',
  styles: [],
})
export class Graphic1Component {
  labels1 = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  data1 = [350, 450, 100];
}
