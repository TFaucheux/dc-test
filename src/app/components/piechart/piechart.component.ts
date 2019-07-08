import {Component, ViewChild, ElementRef, AfterViewInit, OnInit, OnChanges} from '@angular/core';

import * as dc from 'dc';
import {NdxService} from '../../services/ndx.service';
import {AppStateService} from '../../services/AppStateService';
import {ScaleOrdinal} from 'd3-scale';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css'],
  providers: []
})
export class PieChartComponent implements OnInit, AfterViewInit {

  // public defaultTheme: string;
  // public defaultColors: string;
  public title = 'chart works!';
  public chart: dc.PieChart;
  public isLoaded = false;

  @ViewChild('chartContainer', {static: false}) chartContainer: ElementRef;
  @ViewChild('chartDiv', {static: false}) chartDiv: ElementRef;

  constructor(public ndxService: NdxService,
              private data: AppStateService) {
  }

  ngOnInit() {
      // this.data.getTheme().subscribe(theme => this.defaultTheme = theme);
      // this.data.getDefaultColors().subscribe(defaultColors => this.defaultColors = defaultColors);
  }

  ngOnChanges() {
    // const colors: any = this.app.defaultColors;
    // console.log('pie: ' + colors);
    // this.chart.colors(colors);
    // this.chart.render();
  }


  ngAfterViewInit() {
    this.isLoaded = this.ndxService.isLoaded;
    if (this.isLoaded) {
      this.chart = dc.pieChart(this.chartDiv.nativeElement);
      this.chart
          .width(400).height(200)
          .useViewBoxResizing(true)
          .dimension(this.ndxService.regionPieDimension)
          .group(this.ndxService.regionPieGroup)
          .innerRadius(50);
      this.chart.colors(dc.config.defaultColors())
      this.chart.render();
    }
  }

  updateChart() {
    this.chart.colors(dc.config.defaultColors()).redraw();
  }

  reset() {
    this.chart.filterAll();
    this.chart.redraw();
  }

  onResize() {
    this.chart.redraw();
  }

}
