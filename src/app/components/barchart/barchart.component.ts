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
          .group(this.ndxService.speedSumGroup)
          // .group(this.ndxService.speedExptSumGroup, this.sel_stack('1'))
          .margins({top: 10, right: 30, bottom: 30, left: 30})
          .width(380)
          .height(280)
          .useViewBoxResizing(true)
          .title(function(d) {
            return d.key + '[' + this.layer + ']: ' + d.value[this.layer];
          })
          .x(d3.scaleLinear().domain([0, 20]))
          .y(d3.scaleLinear().domain([0, 200]))
          .brushOn(false)
          .yAxisLabel('This is the Y Axis!')
          .colors(dc.config.defaultColors())
          // .on('renderlet', chart => {
          //   chart.selectAll('rect').on('click', d => {
          //     console.log('click!', d);
          //   })
          // })
          // .on('preRedraw', chart => {
          //   const width: number = this.chartDiv.nativeElement.offsetWidth;
          //   const newWidth: number = this.chartContainer.nativeElement.offsetWidth;
          //
          //   chart.width(newWidth).transitionDuration(0);
          //   chart.transitionDuration(750);
          // })
          .renderLabel(false);

      // for(let i = 2; i < 6; ++i) {
      //   this.chart.stack(this.ndxService.speedExptSumGroup, '' + i, this.sel_stack(i));
      // }
      //
      this.chart.render();
    }
  }


  sel_stack(i) {
    return d => d.value[i];
  }

  updateChart() {
    this.chart.colors(dc.config.defaultColors()).redraw();
  }

  onResize() {
    this.chart.redraw();
  }

}
