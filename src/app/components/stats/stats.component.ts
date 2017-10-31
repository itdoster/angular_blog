import { Component, OnInit } from '@angular/core';
import { StatisticsService, AlertService } from '../../services/index';
import { Statistic } from '../../shared/interfaces/index';
import { ChartTypes } from '../../constants/charts.types';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  private charts: Array<any> = [];
  private statistic: Statistic;
  private availableChartTypes: Array<string>;

  constructor(
    private statService: StatisticsService,
    private alertService: AlertService) { }

  public ngOnInit(): void {
    this.loadAuthorStats();
    this.availableChartTypes = ChartTypes.ToList();
  }

  private loadAuthorStats(): void {
    this.statService.getStatsByAuthors().subscribe(
      data => { this.statistic = data }),
      error => { this.alertService.error(error); },
      () => { }
  }

  public transferChartSuccess($event: any): void {
    this.charts.push($event.dragData);
  }

  public removeChart(chartType: string): void {
    this.charts.splice(this.charts.indexOf(chartType), 1);
  }
}
