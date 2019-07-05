import {Component, ViewChild, ElementRef, AfterViewInit, OnInit} from '@angular/core';

import * as d3 from 'd3';
import * as dc from 'dc';
import {NdxService} from '../../services/ndx.service';

@Component({
  selector: 'app-bubblechart',
  templateUrl: './bubblechart.component.html',
  styleUrls: ['./bubblechart.component.css'],
  providers: []
})
export class BubbleChartComponent implements OnInit, AfterViewInit {

  public title = 'bubblechart works!';
  public isLoaded = false;
  public chart: dc.BubbleChart;

  @ViewChild('chartContainer', {static: false}) chartContainer: ElementRef;
  @ViewChild('chartDiv', {static: false}) chartDiv: ElementRef;

  constructor(public ndxService: NdxService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.isLoaded = this.ndxService.isLoaded;
    if (this.isLoaded) {

      const numberFormat = d3.format('.2f');
      this.chart = dc.bubbleChart(this.chartDiv.nativeElement);
      this.chart
          .dimension(this.ndxService.exptDimension)
          .group(this.ndxService.exptGroup)
          .margins({top: 20, right: 30, bottom: 20, left: 30})
          .width(380)
          .height(200)
          .useViewBoxResizing(true)
          .brushOn(true)
          .clipPadding(10)
          .yAxisLabel('This is the Y Axis!')
          .keyAccessor(p => p.key)
          .valueAccessor(p => p.value.avg)
          .radiusValueAccessor(p => p.value.expt)
          .x(d3.scaleLinear().domain([0, 5]))
          .r(d3.scaleLinear().domain([0, 1000]))
          .minRadiusWithLabel(15)
          .elasticY(true)
          // .yAxisPadding(100)
          .elasticX(true)
          // .xAxisPadding(200)
          .maxBubbleRelativeSize(0.07)
          .renderHorizontalGridLines(true)
          .renderVerticalGridLines(true)
          .renderLabel(true)
          .renderTitle(true)
          .title(p => p.key
              + '\n'
              + 'total ' + numberFormat(p.value.total) + 'M\n'
              + 'Number of Expt: ' + numberFormat(p.value.expt))
          .colors(dc.config.defaultColors());
          // .on('renderlet', chart => {
          //   chart.selectAll('rect').on('click', d => {
          //     console.log('click!', d);
          //   });
          // })
          // .on('preRedraw', chart => {
          //   const width: number = this.chartDiv.nativeElement.offsetWidth;
          //   const newWidth: number = this.chartContainer.nativeElement.offsetWidth;
          //
          //   chart.width(newWidth).transitionDuration(0);
          //   chart.transitionDuration(750);
          // });

        // this.chart.yAxis().tickFormat(s => s + ' deals');
        // this.chart.xAxis().tickFormat(s => s + 'M');


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
