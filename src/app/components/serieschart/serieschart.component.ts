import {Component, ViewChild, ElementRef, AfterViewInit, OnInit} from '@angular/core';

import * as d3 from 'd3';
import * as dc from 'dc';
import {NdxService} from '../../services/ndx.service';

@Component({
  selector: 'app-serieschart',
  templateUrl: './serieschart.component.html',
  styleUrls: ['./serieschart.component.css'],
  providers: []
})
export class SeriesChartComponent implements OnInit, AfterViewInit {

  public title = 'dc.js sub-chart works!';
  public isLoaded = false;
  public chart: dc.SeriesChart;

  @ViewChild('chartContainer', {static: false}) chartContainer: ElementRef;
  @ViewChild('chartDiv', {static: false}) chartDiv: ElementRef;

  constructor(public ndxService: NdxService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.isLoaded = this.ndxService.isLoaded;
    if (this.isLoaded) {
      this.chart = dc.seriesChart(this.chartDiv.nativeElement);
      this.chart
          .width(380)
          .height(280)
          .margins({top: 20, right: 20, bottom: 20, left: 20})
          .dimension(this.ndxService.exptRunDimension)
          .group(this.ndxService.runGroup)
          .chart(c => dc.lineChart(c))
          //.chart(c => dc.lineChart(c.curve(d3.curveCardinal.tension(0.5))))
          .x(d3.scaleLinear().domain([0, 20]))
          .brushOn(false)
          .yAxisLabel('Measured Speed km/s')
          .xAxisLabel('Run')
          .clipPadding(10)
          .elasticY(true)
          .mouseZoomable(true)
          .seriesAccessor(d => 'Expt: ' + d.key[0])
          .keyAccessor(d => +d.key[1])
          .valueAccessor(d => +d.value - 500)
          .legend(dc.legend().x(350).y(350).itemHeight(13).gap(5).horizontal(true).legendWidth(140).itemWidth(70))
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
          });

        this.chart.yAxis().tickFormat(d => d3.format(',d')(d + 299500));
        this.chart.margins().left += 40;
        //dc.renderAll();
        this.chart.render();

    }
  }

  onResize() {
    this.chart.redraw();
  }

}
