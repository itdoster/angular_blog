import { Component, OnInit, Input } from '@angular/core';
import { Statistic } from '../../../shared/interfaces/index';

@Component({
  selector: 'doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.css']
})

export class DoughnutChartComponent implements OnInit {
  @Input() statistic: Statistic;

  private type: string = 'doughnut';

  constructor() { }

  public ngOnInit(): void {
  }

}
