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
  title = 'dc.js sub-chart works!';

  @ViewChild('chartDiv', {static: false}) chartDiv: ElementRef;
  //private barChart: dc.BarChart = dc.barChart('chartDiv'); // this.chartDiv.nativeElement);

  constructor(private ndxService: NdxService) {
  }

  ngOnInit() {
    console.log('0. chart.component: ngOnInit() - started');
  }

  ngAfterViewInit() {
    console.log ('chart.component: ngAfterViewInit() - started');
    console.log(this.ndxService.isLoaded);
    this.isLoaded = this.ndxService.isLoaded;
    if (this.isLoaded) {
      const barChart = dc.barChart(this.chartDiv.nativeElement);

      barChart
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
        });

      barChart.render();
    }

    }
}
