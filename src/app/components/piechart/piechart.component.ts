import {Component, ViewChild, ElementRef, AfterViewInit, OnInit, OnChanges} from '@angular/core';

import * as dc from 'dc';
import {NdxService} from '../../services/ndx.service';
import {AppStateService} from '../../services/AppStateService';
import {ScaleOrdinal} from 'd3-scale';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css'],
  providers: []
})
export class PieChartComponent implements OnInit, AfterViewInit {

  public defaultTheme: string;
  public defaultColors: string;
  public title = 'chart works!';
  public chart: dc.PieChart;
  public isLoaded = false;

  @ViewChild('chartContainer', {static: false}) chartContainer: ElementRef;
  @ViewChild('chartDiv', {static: false}) chartDiv: ElementRef;

  constructor(public ndxService: NdxService,
              private data: AppStateService) {
  }

  ngOnInit() {
      this.data.getTheme().subscribe(theme => this.defaultTheme = theme);
      this.data.getDefaultColors().subscribe(defaultColors => this.defaultColors = defaultColors);
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
          .colors(dc.config.defaultColors())
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
            chart.render();
          });
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
