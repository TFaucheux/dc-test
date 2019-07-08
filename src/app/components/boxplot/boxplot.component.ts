import {Component, ViewChild, ElementRef, AfterViewInit, OnInit} from '@angular/core';

import * as d3 from 'd3';
import * as dc from 'dc';
import {NdxService} from '../../services/ndx.service';

@Component({
  selector: 'app-boxplot',
  templateUrl: './boxplot.component.html',
  styleUrls: ['./boxplot.component.css'],
  providers: []
})
export class BoxPlotComponent implements OnInit, AfterViewInit {

  public title = 'chart works!';
  public chart: dc.BoxPlot;
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
      this.chart = dc.boxPlot(this.chartDiv.nativeElement);
      this.chart
          .width(380).height(200)
          .useViewBoxResizing(true)
          .dimension(this.ndxService.exptDimension)
          .group(this.ndxService.speedArrayGroup)
          .margins({top: 10, right: 30, bottom: 30, left: 30})
          .elasticY(true)
          .elasticX(true);

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
