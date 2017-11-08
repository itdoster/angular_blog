import {Component, OnInit, Input} from '@angular/core';
import {Statistic} from '../../../shared/interfaces/index';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  @Input() statistic: Statistic;

  private type = 'pie';

  constructor() {
  }

  public ngOnInit(): void {
  }

}
