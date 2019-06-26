import {Component, ViewChild, ElementRef, AfterViewInit, OnInit} from '@angular/core';

import * as d3 from 'd3';
import * as dc from 'dc';
import {NdxService} from '../../services/ndx.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
  providers: []
})
export class ChartComponent implements OnInit, AfterViewInit {
  public title = 'dc.js sub-chart works!';
  public isLoaded = false;
  public barChart: dc.BarChart;

  @ViewChild('chartContainer', {static: false}) chartContainer: ElementRef;
  @ViewChild('chartDiv', {static: false}) chartDiv: ElementRef;

  constructor(public ndxService: NdxService) {
  }

  ngOnInit() {
    console.log('0. chart.component: ngOnInit() - started');
  }

  ngAfterViewInit() {
    console.log('chart.component: ngAfterViewInit() - started');
    this.isLoaded = this.ndxService.isLoaded;
    console.log(this.ndxService.isLoaded, this.isLoaded);
    if (this.isLoaded) {

      console.log(this.chartContainer.nativeElement.offsetWidth, this.chartDiv.nativeElement.offsetWidth);

      const barChart = dc.barChart(this.chartDiv.nativeElement);
      this.barChart = barChart;


      this.barChart
          .dimension(this.ndxService.runDimension)
          .group(this.ndxService.speedSumGroup)
          .width(768)
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
            console.log('resize(chart) - started')
            const width: number = this.chartDiv.nativeElement.offsetWidth;
            const newWidth: number = this.chartContainer.nativeElement.offsetWidth;
            console.log(width, newWidth);

            chart.width(newWidth).transitionDuration(0);
            chart.transitionDuration(750);
            chart.render();
          })
          ;

      // this.ndxService.apply_resizing(barChart, 20,20, null);
      this.barChart.render();
    }
  }

  onResize() {
    this.barChart.redraw();
  }

}
