export class ChartTypes {
  public static Doughnut = {icon: '../../assets/img/doughnut.png', type: 'doughnut'};
  public static PieChart = {icon: '../../assets/img/pie-chart.png', type: 'pie'};
  public static PolarArea = {icon: '../../assets/img/polar-area.png', type: 'polarArea'};

  public static ToList() {
    return [this.Doughnut, this.PieChart, this.PolarArea];
  }
}
