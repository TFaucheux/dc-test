import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import * as d3 from 'd3';
import * as dc from 'dc';

import {NdxService} from '../../services/ndx.service';
import {AppStateService} from '../../services/AppStateService';
// import {BubbleOverlayComponent} from '../bubbleoverlay/bubbleoverlay.component';

@Component({
  selector: 'app-statechloropleth',
  templateUrl: './statechloropleth.component.html',
  styleUrls: ['./statechloropleth.component.css'],
  providers: []
})
export class StateChloroplethComponent implements OnInit, AfterViewInit {

  public defaultTheme: string;
  // public defaultColors: ScaleOrdinal<string, string>;
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
            .width(900).height(500)
            .useViewBoxResizing(true)
            .dimension(this.ndxService.stateDimension)
            .group(this.ndxService.stateValueSumGroup)
            .colorDomain([0, 20000])
            .overlayGeoJson(states.features, 'name', d => d.properties.name);
        this.chart.colors(dc.config.defaultColors())
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
