import {Component, ViewChild, ElementRef, AfterViewInit, OnInit} from '@angular/core';

import * as d3 from 'd3';
import * as dc from 'dc';
import {NdxService} from '../../services/ndx.service';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css'],
  providers: []
})
export class BarChartComponent implements OnInit, AfterViewInit {

  public title = 'dc.js sub-chart works!';
  public isLoaded = false;
  public chart: dc.BarChart;

  @ViewChild('chartContainer', {static: false}) chartContainer: ElementRef;
  @ViewChild('chartDiv', {static: false}) chartDiv: ElementRef;

  constructor(public ndxService: NdxService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.isLoaded = this.ndxService.isLoaded;
    if (this.isLoaded) {
      this.chart = dc.barChart(this.chartDiv.nativeElement);
      this.chart
          .dimension(this.ndxService.runDimension)
          .group(this.ndxService.exptSumGroup)
          .margins({top: 20, right: 20, bottom: 20, left: 20})
          .width(380)
          .height(480)
          .x(d3.scaleLinear().domain([0, 20]))
          .y(d3.scaleLinear().domain([0, 20]))
          .brushOn(false)
          .yAxisLabel('This is the Y Axis!')
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

      this.chart.render();
    }
  }

  onResize() {
    this.chart.redraw();
  }

}
