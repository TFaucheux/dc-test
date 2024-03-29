import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import * as d3 from 'd3';
import * as dc from 'dc';

import {NdxService} from '../../services/ndx.service';
import {AppStateService} from '../../services/AppStateService';

@Component({
  selector: 'app-chloropleth',
  templateUrl: './chloropleth.component.html',
  styleUrls: ['./chloropleth.component.css'],
  providers: []
})
export class ChloroplethComponent implements OnInit, AfterViewInit {

  public defaultTheme: string;
  // public defaultColors: string;
  public title = 'dc.js sub-chart works!';
  public isLoaded = false;
  public chart: dc.GeoChoroplethChart;

  @ViewChild('chartContainer', {static: false}) chartContainer: ElementRef;
  @ViewChild('chartDiv', {static: false}) chartDiv: ElementRef;

  constructor(public data: AppStateService, public ndxService: NdxService) {
  }

  ngOnInit() {
    this.data.getTheme().subscribe(theme => this.defaultTheme = theme);
    // this.data.getDefaultColors().subscribe(defaultColors => this.defaultColors = defaultColors);
  }

  ngAfterViewInit() {
    this.isLoaded = this.ndxService.isLoaded;
    if (this.isLoaded) {
      d3.json('assets/data/geo/us-states.json').then((states: any) => {

        this.chart = dc.geoChoroplethChart(this.chartDiv.nativeElement)
            .width(900)
            .height(500)
            .useViewBoxResizing(true)
            .dimension(this.ndxService.regionDimension)
            .group(this.ndxService.regionValueSumGroup)
            .colorDomain([0, 200])
            .overlayGeoJson(states.features, 'region', d => d.properties.region);

        this.chart.colors(dc.config.defaultColors());
        this.chart.render();
      });
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
