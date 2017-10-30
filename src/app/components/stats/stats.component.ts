import { Component, OnInit } from '@angular/core';
import { StatisticsService, AlertService } from '../../services/index';
import { Statistic } from '../../shared/interfaces/index';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  private statistic: Statistic;

  constructor(
    private statService: StatisticsService,
    private alertService: AlertService) { }

  public ngOnInit(): void {
    this.loadAuthorStats();
  }

  private loadAuthorStats(): void {
    this.statService.getStatsByAuthors().subscribe(
      data => { this.statistic = data }),
      error => { this.alertService.error(error); },
      () => { }
  }
}
