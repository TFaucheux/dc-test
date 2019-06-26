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
  public barChart: dc.BarChart;

  @ViewChild('barChartContainer', {static: false}) barChartContainer: ElementRef;
  @ViewChild('barChartDiv', {static: false}) barChartDiv: ElementRef;

  constructor(public ndxService: NdxService) {
  }

  ngOnInit() {
    console.log('0. barChart.component: ngOnInit() - started');
  }

  ngAfterViewInit() {
    console.log('barChart.component: ngAfterViewInit() - started');
    this.isLoaded = this.ndxService.isLoaded;
    // console.log(this.ndxService.isLoaded, this.isLoaded);
    if (this.isLoaded) {

      // console.log(this.barChartContainer.nativeElement.offsetWidth, this.barChartDiv.nativeElement.offsetWidth);

      const barChart = dc.barChart(this.barChartDiv.nativeElement);
      this.barChart = barChart;

      this.barChart
          .dimension(this.ndxService.runDimension)
          .group(this.ndxService.speedSumGroup)
          .margins({top: 20, right: 20, bottom: 20, left: 20})
          .width(380)
          .height(480)
          .x(d3.scaleLinear().domain([6, 20]))
          .brushOn(false)
          .yAxisLabel('This is the Y Axis!')
          .on('renderlet', chart => {
            chart.selectAll('rect').on('click', d => {
              console.log('click!', d);
            });
          })
          .on('preRedraw', chart => {
            // console.log('resize(chart) - started')
            const width: number = this.barChartDiv.nativeElement.offsetWidth;
            const newWidth: number = this.barChartContainer.nativeElement.offsetWidth;
            // console.log(width, newWidth);

            chart.width(newWidth).transitionDuration(0);
            chart.transitionDuration(750);
            chart.render();
          })
          ;

      this.barChart.render();
    }
  }

  onResize() {
    this.barChart.redraw();
  }

}
