import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { AppSettings } from '../constants/app.settings';

@Injectable()
export class StatisticsService {

  constructor(private http: Http) { }

  public getStatsByAuthors() {
    return this.http.get(AppSettings.API_ENDPOINT + 'stats_by_authors')
      .map(response => response.json());
  }
}
