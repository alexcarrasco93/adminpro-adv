import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-doughnut',
  templateUrl: './doughnut.component.html',
  styles: [],
})
export class DoughnutComponent implements OnChanges {
  @Input()
  title = 'No Titlte';
  @Input()
  labels: string[] = [];
  @Input()
  data: number[] = [];

  doughnutChartData: ChartData<'doughnut'> = { labels: [], datasets: [] };

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']?.currentValue) {
      this.doughnutChartData = {
        labels: this.labels,
        datasets: [{ data: this.data }],
      };
    }
  }
}
