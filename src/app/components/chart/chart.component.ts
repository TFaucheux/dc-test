import {Component, ViewChild, ElementRef, AfterViewInit, OnInit} from '@angular/core';

import * as d3 from 'd3';
import * as dc from 'dc';
import {NdxService} from '../../services/ndx.service';
import {IData} from '../../models/Data';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
  providers: []
})
export class ChartComponent implements OnInit, AfterViewInit {
  title = 'dc.js sub-chart works!';
  public data: Array<IData>;
  myData: any;

  @ViewChild('chartDiv', {static: false}) chartDiv: ElementRef;
  // barChart: dc.BarChart = dc.barChart(this.chartDiv.nativeElement);
  barChart2: dc.BarChart = dc.barChart('#chartDiv');

  constructor(public ndxService: NdxService) {
  }

  ngOnInit() {
    console.log('0. chart.component: ngOnInit() - started');
/*
    // subscribe to the postsData Stream
    this.ndxService.Data.subscribe(( data: Array<IData>) => {

      // mimic a slow connection
      setTimeout(() => {
        // set data
        this.data = data;
      }, 5000);
    });

    // make the http request
    // this.ndxService.loadAllData();
    // this.myData = this.ndxService.getData();
    console.log('0. chart.component: ngOnInit() - ' + (this.ndxService.data));
  */
  }

  refreshData() {
    // re-set the ui
    // this.data.length = 0;

    // make the http request
    // this.ndxService.loadAllData();
    // this.myData = this.ndxService.getData();
    // console.log('refreshData() - ' + JSON.stringify(this.myData));
  }

  ngAfterViewInit() {
    console.log ('chart.component: ngAfterViewInit() - started');
    // console.log ('ngAfterViewInit() - ' + this.chartDiv.nativeElement);
    // this.myData = JSON.stringify(this.ndxService.data);
    // console.log('ngAfterViewInit() - myData:' + this.myData);

    if (this.ndxService.isLoaded) {
      console.log('1. chart.component: ngAfterViewInit() - ' + this.ndxService.data);
      console.log('2. chart.component: ngAfterViewInit() - ' + this.data);
      console.log('3. chart.component: ngAfterViewInit() - ' + this.myData);

      // const chart = dc.barChart(this.chartDiv.nativeElement);

      this.barChart2
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

      this.barChart2.render();
    }
    }
}
