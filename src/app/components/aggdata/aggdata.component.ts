import {Component, ViewChild, ElementRef, AfterViewInit, OnInit} from '@angular/core';

import * as d3 from 'd3';
import * as dc from 'dc';
import {NdxService} from '../../services/ndx.service';

@Component({
  selector: 'app-aggdata',
  templateUrl: './aggdata.component.html',
  styleUrls: ['./aggdata.component.css'],
  providers: []
})
export class AggDataComponent implements OnInit, AfterViewInit {

  public title = 'dc.js sub-chart works!';
  public isLoaded = false;
  public chart: dc.DataTableWidget;

  @ViewChild('chartContainer', {static: false}) chartContainer: ElementRef;
  @ViewChild('chartDiv', {static: false}) chartDiv: ElementRef;

  constructor(public ndxService: NdxService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.isLoaded = this.ndxService.isLoaded;
    if (this.isLoaded) {
      this.chart = dc.dataTable(this.chartDiv.nativeElement);
      this.chart
          .dimension(this.ndxService.exptGroup)
//          .width(380)
//          .height(280)
          .showGroups(true)
          // .showSections(false)
          .columns([d => d.key,
              d => d.value.total,
              d => d.value.avg])
          .sortBy(d => d.value.avg)
          .order(d3.descending)
          // .colors(dc.config.defaultColors())
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

        this.chart.render();

    }
  }

  sel_stack(i) {
   return function n(d) {
             return d.value[i];
           };
 }

  onResize() {
    this.chart.redraw();
  }

}
