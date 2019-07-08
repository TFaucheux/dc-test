import {Component, ViewChild, ElementRef, AfterViewInit, OnInit} from '@angular/core';

import * as d3 from 'd3';
import * as dc from 'dc';
import {NdxService} from '../../services/ndx.service';

@Component({
  selector: 'app-bubbleoverlay',
  templateUrl: './bubbleoverlay.component.html',
  styleUrls: ['./bubbleoverlay.component.css'],
  providers: []
})
export class BubbleOverlayComponent implements OnInit, AfterViewInit {

  public title = 'bubblechart works!';
  public isLoaded = false;
  public chart: dc.BubbleOverlay;

  @ViewChild('bubbleOverlay', {static: false}) bubbleOverlay: ElementRef;

  constructor(public ndxService: NdxService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.isLoaded = this.ndxService.isLoaded;
    if (this.isLoaded) {

      // const numberFormat = d3.format('.2f');
      this.chart = dc.bubbleOverlay(this.bubbleOverlay.nativeElement);
      this.chart
          .svg(d3.select('#bubbleOverlay svg'))
          .width(380)
          .height(200)
          .useViewBoxResizing(true)
          .dimension(this.ndxService.stateDimension)
          .group(this.ndxService.stateValueSumGroup)
          .r(d3.scaleLinear().domain([0, 300]))
          .title(d => 'Title: ' + d.key)
          .point('CA', 100, 120)
          .point('CO', 300, 120)
          .point('DE', 500, 220)
          .point('ON', 180, 90)
          .point('MS', 120, 220)
          .point('OK', 200, 350)
          .colors(dc.config.defaultColors());

      this.chart.render();
    }
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
