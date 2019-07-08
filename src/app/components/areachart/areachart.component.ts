import {Component, ViewChild, ElementRef, AfterViewInit, OnInit} from '@angular/core';

import * as d3 from 'd3';
import * as dc from 'dc';
import {NdxService} from '../../services/ndx.service';

@Component({
  selector: 'app-areachart',
  templateUrl: './areachart.component.html',
  styleUrls: ['./areachart.component.css'],
  providers: []
})
export class AreaChartComponent implements OnInit, AfterViewInit {

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
          .height(200)
          .width(380)
          .x(d3.scaleLinear().domain([6, 20]))
          .dimension(this.ndxService.runDimension)
          .group(this.ndxService.speedSumGroup)
          .margins({top: 20, right: 30, bottom: 20, left: 30})
          .useViewBoxResizing(true)
          .brushOn(true)
          .renderArea(true)
          .renderDataPoints(true)
          .clipPadding(10)
          .yAxisLabel('This is the Y Axis!');

      for (let i = 2; i <6; ++i)
              this.chart.stack(this.ndxService.speedSumGroup, '' +i, this.sel_stack(i));

      this.chart.colors(dc.config.defaultColors());
      this.chart.render();

    }
  }

  sel_stack(i) {
   return function n(d) {
             return d.value[i];
           };
 }

 reset() {
     this.chart.filterAll();
     this.chart.redraw();
 }

 updateChart() {
     this.chart.colors(dc.config.defaultColors()).redraw();
 }

  onResize() {
    this.chart.redraw();
  }

}
