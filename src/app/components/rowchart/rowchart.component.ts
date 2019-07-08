import {Component, ViewChild, ElementRef, AfterViewInit, OnInit} from '@angular/core';

import * as d3 from 'd3';
import * as dc from 'dc';
import {NdxService} from '../../services/ndx.service';

@Component({
  selector: 'app-rowchart',
  templateUrl: './rowchart.component.html',
  styleUrls: ['./rowchart.component.css'],
  providers: []
})
export class RowChartComponent implements OnInit, AfterViewInit {

  public title = 'dc.js sub-chart works!';
  public isLoaded = false;
  public chart: dc.RowChart;

  @ViewChild('chartContainer', {static: false}) chartContainer: ElementRef;
  @ViewChild('chartDiv', {static: false}) chartDiv: ElementRef;

  constructor(public ndxService: NdxService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.isLoaded = this.ndxService.isLoaded;
    if (this.isLoaded) {
      // see the following for adding target lines
      // https://github.com/dc-js/dc.js/blob/master/web/examples/row-targets.html
      this.chart = dc.rowChart(this.chartDiv.nativeElement);
      this.chart
          .width(380).height(280)
          .margins({top: 10, right: 30, bottom: 30, left: 30})
          .useViewBoxResizing(true)
          .dimension(this.ndxService.runDimension)
          .group(this.ndxService.speedSumGroup)
          .x(d3.scaleLinear().domain([6, 20]))
          .elasticX(true)
          .renderTitleLabel(false);
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
