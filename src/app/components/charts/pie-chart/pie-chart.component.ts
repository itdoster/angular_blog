import { Component, OnInit, Input } from '@angular/core';
import { Statistic } from '../../../shared/interfaces/index';

@Component({
  selector: 'pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  @Input() statistic: Statistic;

  private type: string = 'pie';
  
  constructor() { }

  public ngOnInit(): void {
  }

}
