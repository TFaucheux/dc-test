import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AppComponent} from '../../app.component';

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
  public defaultColors: any;
  public title = 'dc.js sub-chart works!';
  public isLoaded = false;
  public chart: dc.GeoChoroplethChart;

  @ViewChild('chartContainer', {static: false}) chartContainer: ElementRef;
  @ViewChild('chartDiv', {static: false}) chartDiv: ElementRef;

  constructor(public data: AppStateService, public ndxService: NdxService) {
  }

  ngOnInit() {
    this.data.themeObservable.subscribe(theme => this.defaultTheme = theme);
  }

  ngAfterViewInit() {
    this.isLoaded = this.ndxService.isLoaded;
    if (this.isLoaded) {

      this.chart = dc.geoChoroplethChart(this.chartDiv.nativeElement)
            .width(900)
            .height(500)
            .useViewBoxResizing(true);

      d3.json('assets/data/geo/us-states.json').then((states: any) => {
          //const colors:any = this.data.getDefaultColors();
          console.log('defaultTheme = ' + this.defaultTheme);

          this.chart
              .dimension(this.ndxService.regionDimension)
              .group(this.ndxService.regionValueSumGroup)
              // .colors(this.defaultColors)
              // .colors(['#ccc', '#E2F2FF', '#C4E4FF', '#9ED2FF', '#81C5FF', '#6BBAFF', '#51AEFF', '#36A2FF', '#1E96FF', '#0089FF'])
              .colorDomain([0, 20000])
              .overlayGeoJson(states.features, 'region', d => d.properties.region);
          this.chart.render();
      });
    }
  }

  onResize() {
    this.chart.redraw();
  }

}
