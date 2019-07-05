import {Component, ViewChild, ElementRef, AfterViewInit, OnInit} from '@angular/core';

import * as d3 from 'd3';
import * as dc from 'dc';
import {NdxService} from '../../services/ndx.service';

@Component({
  selector: 'app-compositechart',
  templateUrl: './compositechart.component.html',
  styleUrls: ['./compositechart.component.css'],
  providers: []
})
export class CompositeChartComponent implements OnInit, AfterViewInit {

  public title = 'dc.js sub-chart works!';
  public isLoaded = false;
  public chart: dc.CompositeChart;

  @ViewChild('chartContainer', {static: false}) chartContainer: ElementRef;
  @ViewChild('chartDiv', {static: false}) chartDiv: ElementRef;

  constructor(public ndxService: NdxService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.isLoaded = this.ndxService.isLoaded;
    if (this.isLoaded) {
      this.chart = dc.compositeChart(this.chartDiv.nativeElement);
      this.chart
          .width(380)
          .height(200)
          .margins({top: 10, right: 30, bottom: 30, left: 10})
          .x(d3.scaleLinear().domain([0, 20]))
          .yAxisLabel('The Y Axis')
          .legend(dc.legend().x(80).y(20).itemHeight(13).gap(5))
          .renderHorizontalGridLines(true)
          .compose([
            dc.lineChart(this.chart)
                .dimension(this.ndxService.runDimension)
                .colors(dc.config.defaultColors())
                // .colors('red')
                .group(this.ndxService.exptGroup, 'Top Line')
                .dashStyle([2,2]),
            dc.lineChart(this.chart)
                .dimension(this.ndxService.runDimension)
                .colors(dc.config.defaultColors())
                // .colors('blue')
                .group(this.ndxService.speedSumGroup, 'Bottom Line')
                .dashStyle([5,5])
          ])
          .brushOn(false)
          .colors(dc.config.defaultColors())
          .on('preRedraw', chart => {
            const width: number = this.chartDiv.nativeElement.offsetWidth;
            const newWidth: number = this.chartContainer.nativeElement.offsetWidth;
            chart.width(newWidth).transitionDuration(0);
            chart.transitionDuration(750);
          });

        this.chart.yAxis().tickFormat(d => d3.format(',d')(d + 299500));
        this.chart.margins().left += 40;
        this.chart.render();

    }
  }

  updateChart() {
    this.chart.colors(dc.config.defaultColors()).redraw();
  }

  onResize() {
    this.chart.redraw();
  }

}
