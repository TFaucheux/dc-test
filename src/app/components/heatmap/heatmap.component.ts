import {Component, ViewChild, ElementRef, AfterViewInit, OnInit} from '@angular/core';

import * as d3 from 'd3';
import * as dc from 'dc';
import {NdxService} from '../../services/ndx.service';

@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.css'],
  providers: []
})
export class HeatMapComponent implements OnInit, AfterViewInit {

  public title = 'dc.js sub-chart works!';
  public isLoaded = false;
  public chart: dc.HeatMap;

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
      this.chart = dc.heatMap(this.chartDiv.nativeElement);
      this.chart
          .width(380)
          .height(300)
          .margins({top: 20, right: 30, bottom: 20, left: 30})
          .useViewBoxResizing(true)
          .dimension(this.ndxService.runDimension)
          .group(this.ndxService.runGroup)
          .keyAccessor(d => +d.key[0])
          .valueAccessor(d => +d.key[1])
          .colorAccessor(d => +d.value)
          .title(d => 'Run:   ' + d.key[0] + '\n' +
              'Expt:  ' + d.key[1] + '\n' +
              'Speed: ' + (299000 + d.value) + ' km/s');

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
