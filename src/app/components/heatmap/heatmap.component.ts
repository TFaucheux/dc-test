import {Component, ViewChild, ElementRef, AfterViewInit, OnInit} from '@angular/core';

import * as d3 from 'd3';
import * as dc from 'dc';
import {NdxService} from '../../services/ndx.service';

@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.css'],
  providers: []
})
export class HeatMapComponent implements OnInit, AfterViewInit {

  public title = 'dc.js sub-chart works!';
  public isLoaded = false;
  public chart: dc.HeatMap;

  @ViewChild('chartContainer', {static: false}) chartContainer: ElementRef;
  @ViewChild('chartDiv', {static: false}) chartDiv: ElementRef;

  constructor(public ndxService: NdxService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.isLoaded = this.ndxService.isLoaded;
    if (this.isLoaded) {
      // see the following for adding target lines
      // https://github.com/dc-js/dc.js/blob/master/web/examples/row-targets.html
      this.chart = dc.heatMap(this.chartDiv.nativeElement);
      this.chart
          .dimension(this.ndxService.runDimension)
          .group(this.ndxService.runGroup)
          .margins({top: 20, right: 30, bottom: 20, left: 30})
          .width(380)
          .height(300)
          .useViewBoxResizing(true)
          .keyAccessor(function(d) { return +d.key[0]; })
          .valueAccessor(function(d) { return +d.key[1]; })
          .colors(dc.config.defaultColors())
          .colorAccessor(function(d) { return +d.value; })
          .title(function(d) {
              return 'Run:   ' + d.key[0] + '\n' +
                  'Expt:  ' + d.key[1] + '\n' +
                  'Speed: ' + (299000 + d.value) + ' km/s';})
          //.calculateColorDomain()
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
          //   chart.render();
          // })
          .colors(dc.config.defaultColors())
          // .colors(['#ffffd9','#edf8b1','#c7e9b4','#7fcdbb','#41b6c4','#1d91c0','#225ea8','#253494','#081d58'])
          // .calculateColorDomain()

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
