import {Component, ViewChild, ElementRef, AfterViewInit, OnInit} from '@angular/core';

import * as d3 from 'd3';
import * as dc from 'dc';
import {NdxService} from '../../services/ndx.service';

@Component({
  selector: 'app-numberchart',
  templateUrl: './numberchart.component.html',
  styleUrls: ['./numberchart.component.css'],
  providers: []
})
export class NumberChartComponent implements OnInit, AfterViewInit {

  public title = 'number Chart';
  public chart: dc.NumberDisplayWidget;
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
      this.chart = dc.numberDisplay(this.chartDiv.nativeElement);
      this.chart
          .html({
             one: '<span style=\"color:#fff; font-size: 26px;\">%number</span> Parsec',
            some: '<span style=\"color:#fff; font-size: 26px;\">%number</span> Total Parsecs',
            none: '<span style=\"color:#fff; font-size: 26px;\">No</span> Parsecs'
          })
          .formatNumber(d3.format('.3s'))
          .valueAccessor(this.ndxService.average)
          .group(this.ndxService.meanSpeedGroup);
      this.chart.render();
    }
  }

  onResize() {
    this.chart.redraw();
  }

}
