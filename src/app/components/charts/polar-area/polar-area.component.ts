import {Component, OnInit, Input} from '@angular/core';
import {Statistic} from '../../../shared/interfaces/index';

@Component({
  selector: 'app-polar-area',
  templateUrl: './polar-area.component.html',
  styleUrls: ['./polar-area.component.css']
})
export class PolarAreaComponent implements OnInit {

  @Input() statistic: Statistic;

  private type = 'polarArea';
  private isShowLegend = true;

  constructor() {
  }

  ngOnInit() {
  }

}
