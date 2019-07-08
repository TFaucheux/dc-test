import {Component, ViewChild, ElementRef, AfterViewInit, OnInit} from '@angular/core';

import * as d3 from 'd3';
import * as dc from 'dc';
import {NdxService} from '../../services/ndx.service';

@Component({
  selector: 'app-scatterplot',
  templateUrl: './scatterplot.component.html',
  styleUrls: ['./scatterplot.component.css'],
  providers: []
})
export class ScatterPlotComponent implements OnInit, AfterViewInit {

  public title = 'chart works!';
  public chart: dc.ScatterPlot;
  public isLoaded = false;

  @ViewChild('chartContainer', {static: false}) chartContainer: ElementRef;
  @ViewChild('chartDiv', {static: false}) chartDiv: ElementRef;

  constructor(public ndxService: NdxService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.isLoaded = this.ndxService.isLoaded;
    if (this.isLoaded) {
      this.chart = dc.scatterPlot(this.chartDiv.nativeElement);
      this.chart
          .width(380).height(200)
          .margins({top: 10, right: 30, bottom: 30, left: 30})
          .useViewBoxResizing(true)
          .dimension(this.ndxService.runDimension)
          .group(this.ndxService.speedGroup)
          .xAxisLabel('National Avg')
          .yAxisLabel('Index Score')
          .x(d3.scaleLinear().domain([0, 20]))
          .renderHorizontalGridLines(true)
          .renderVerticalGridLines(true)
          .symbolSize(8)
          .brushOn(true);
      this.chart.colors(dc.config.defaultColors());
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
