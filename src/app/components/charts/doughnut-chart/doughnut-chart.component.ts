import {Component, OnInit, Input} from '@angular/core';
import {Statistic} from '../../../shared/interfaces/index';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.css']
})

export class DoughnutChartComponent implements OnInit {
  @Input() statistic: Statistic;

  private type = 'doughnut';

  constructor() {
  }

  public ngOnInit(): void {
  }

}
