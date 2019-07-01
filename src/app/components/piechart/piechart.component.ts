import {Component, ViewChild, ElementRef, AfterViewInit, OnInit, OnChanges} from '@angular/core';

import * as dc from 'dc';
import {NdxService} from '../../services/ndx.service';
import {AppComponent} from '../../app.component';
import {AppStateService} from '../../services/AppStateService';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css'],
  providers: []
})
export class PieChartComponent implements OnInit, AfterViewInit {

  public message: string;
  public title = 'chart works!';
  public chart: dc.PieChart;
  public isLoaded = false;

  @ViewChild('chartContainer', {static: false}) chartContainer: ElementRef;
  @ViewChild('chartDiv', {static: false}) chartDiv: ElementRef;

  constructor(public ndxService: NdxService,
              private data: AppStateService) {
  }

  ngOnInit() {
    // console.log('pieChart.ngOnInit() - ' + JSON.stringify(this.data))
    this.data.messageObservable.subscribe(message => this.message = message);
  }

  ngOnChanges() {
    // const colors: any = this.app.defaultColors;
    // console.log('pie: ' + colors);
    // this.chart.colors(colors);
    // this.chart.render();
  }


  ngAfterViewInit() {
    this.isLoaded = this.ndxService.isLoaded;
    if (this.isLoaded) {
      this.chart = dc.pieChart(this.chartDiv.nativeElement);
      this.chart
          .width(400).height(200)
          .dimension(this.ndxService.runDimension)
          .group(this.ndxService.exptSumGroup)
          .innerRadius(50)
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
            // chart.render();
          });
      this.chart.render();
    }
  }

  onResize() {
    this.chart.redraw();
  }

}
