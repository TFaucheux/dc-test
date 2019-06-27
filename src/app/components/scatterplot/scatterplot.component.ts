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

  constructor(private ndxService: NdxService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.isLoaded = this.ndxService.isLoaded;
    if (this.isLoaded) {
      this.chart = dc.scatterPlot(this.chartDiv.nativeElement);
      this.chart
          .width(400).height(220)
          .dimension(this.ndxService.runDimension)
          .group(this.ndxService.speedGroup)
          .margins({top: 10, right: 20, bottom: 30, left: 40})
          .xAxisLabel('National Avg')
          .yAxisLabel('Index Score')
          .x(d3.scaleLinear().domain([1, 20]))
          //.y(d3.scaleLinear().domain([500, 200]))
          // .mouseZoomable(true)
          .renderHorizontalGridLines(true)
          .renderVerticalGridLines(true)
          .symbolSize(8)
          .clipPadding(10)
          .on('renderlet', chart => {
            chart.selectAll('rect').on('click', d => {
              console.log('click!', d);
            });
          })
          .on('preRedraw', chart => {
            const width: number = this.chartDiv.nativeElement.offsetWidth;
            const newWidth: number = this.chartContainer.nativeElement.offsetWidth;

            chart.width(newWidth).transitionDuration(0);
            chart.transitionDuration(750);
            chart.render();
          });
/*
      const xAxisChart = this.chart.xAxis();
      xAxisChart.ticks(6).tickFormat(d3.format('d'));
      const yAxisChart = this.chart.yAxis();
      yAxisChart.ticks(6).tickFormat(d3.format('d'));
*/
      this.chart.render();
    }
  }

  onResize() {
    this.chart.redraw();
  }

}
