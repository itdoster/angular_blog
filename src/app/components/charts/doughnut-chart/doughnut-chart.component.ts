import { Component, OnInit, Input } from '@angular/core';
import { Statistic } from '../../../shared/interfaces/index';

@Component({
  selector: 'doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.css']
})

export class DoughnutChartComponent implements OnInit {
  @Input() statistic: Statistic;

  constructor() { }

  public ngOnInit(): void {
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}
