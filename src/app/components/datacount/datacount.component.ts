import {Component, ViewChild, ElementRef, AfterViewInit, OnInit} from '@angular/core';

import * as dc from 'dc';
import {NdxService} from '../../services/ndx.service';

@Component({
  selector: 'app-datacount',
  templateUrl: './datacount.component.html',
  styleUrls: ['./datacount.component.css'],
  providers: []
})
export class DataCountComponent implements OnInit, AfterViewInit {

  public title = 'datacount works!';
  public dataCount: dc.dataCount;
  public isLoaded = false;

  @ViewChild('chartContainer', {static: false}) chartContainer: ElementRef;
  @ViewChild('dataCount', {static: false}) chartDiv: ElementRef;

  constructor(public ndxService: NdxService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.isLoaded = this.ndxService.isLoaded;
    console.log(this.isLoaded, this.ndxService.isLoaded);
    if (this.isLoaded) {

      this.dataCount = dc.dataCount(this.chartDiv.nativeElement);
      this.dataCount
          .crossfilter(this.ndxService.ndx)
          .groupAll(this.ndxService.all);

//      this.chart.render();
    }
  }

  resetAll() {
    this.ndxService.resetAll();
  }

  onResize() {
    this.dataCount.redraw();
  }

}
