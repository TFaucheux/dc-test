import {Component, ViewChild, ElementRef, AfterViewInit, OnInit} from '@angular/core';

import * as d3 from 'd3';
import * as dc from 'dc';
import {NdxService} from '../../services/ndx.service';

@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.css'],
  providers: []
})
export class LineChartComponent implements OnInit, AfterViewInit {

  public title = 'dc.js sub-chart works!';
  public isLoaded = false;
  public chart: dc.LineChart;

  @ViewChild('chartContainer', {static: false}) chartContainer: ElementRef;
  @ViewChild('chartDiv', {static: false}) chartDiv: ElementRef;

  constructor(public ndxService: NdxService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.isLoaded = this.ndxService.isLoaded;
    if (this.isLoaded) {
      this.chart = dc.lineChart(this.chartDiv.nativeElement);
      this.chart
          .width(380)
          .height(200)
          .margins({top: 20, right: 30, bottom: 30, left: 30})
          .useViewBoxResizing(true)
          .dimension(this.ndxService.runDimension)
          .group(this.ndxService.speedSumGroup)
          .x(d3.scaleLinear().domain([6, 20]))
          .brushOn(true)
          .renderArea(false)
          .renderDataPoints(true)
          .clipPadding(10)
          .yAxisLabel('This is the Y Axis!');

      for(let i = 2; i<6; ++i)
          this.chart.stack(this.ndxService.speedSumGroup, '' + i, this.sel_stack(i));

      this.chart.colors(dc.config.defaultColors());
      this.chart.render();

    }
  }

  sel_stack(i) {
   return function n(d) {
             return d.value[i];
           };
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
