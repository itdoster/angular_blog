import { Component, ViewContainerRef, ViewChild, ReflectiveInjector, OnChanges, Input, ComponentFactory, ComponentRef, ComponentFactoryResolver, ChangeDetectorRef, TemplateRef, OnDestroy, OnInit } from '@angular/core';
import { ChartTypes } from '../../../constants/charts.types';
import { DoughnutChartComponent } from '../doughnut-chart/doughnut-chart.component'
import { Statistic } from '../../../shared/interfaces/index';

@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnDestroy {

  @ViewChild("chartContainer", { read: ViewContainerRef }) container;
  @Input() chartType: string;
  @Input() data: Statistic;

  public componentRef: ComponentRef<any>;

  constructor(private resolver: ComponentFactoryResolver) { }

  public ngOnInit(): void {
    this.createComponent();
  }

  public createComponent(): void {
    this.container.clear();
    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(this.getComponentByType(this.chartType));
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.statistic = this.data;
  }

  public getComponentByType(type): any {
    switch (this.chartType) {
      case ChartTypes.Doughnut.type: {
        return DoughnutChartComponent;
      }
      default:
        break
    }
  }

  public ngOnDestroy(): void {
    this.componentRef.destroy();
  }
}
