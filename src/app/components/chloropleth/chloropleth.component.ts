import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import * as d3 from 'd3';
import * as dc from 'dc';
import * as topojson from 'topojson';

import {NdxService} from '../../services/ndx.service';
import {AppStateService} from '../../services/AppStateService';
import {path} from 'd3';

@Component({
  selector: 'app-chloropleth',
  templateUrl: './chloropleth.component.html',
  styleUrls: ['./chloropleth.component.css'],
  providers: []
})
export class ChloroplethComponent implements OnInit, AfterViewInit {

  public defaultTheme: string;
  // public defaultColors: ScaleOrdinal<string, string>;
  public defaultColors: string;
  public title = 'dc.js sub-chart works!';
  public isLoaded = false;
  public chart: dc.GeoChoroplethChart;

  @ViewChild('chartContainer', {static: false}) chartContainer: ElementRef;
  @ViewChild('chartDiv', {static: false}) chartDiv: ElementRef;

  constructor(public data: AppStateService, public ndxService: NdxService) {
  }

  ngOnInit() {
    this.data.getTheme().subscribe(theme => this.defaultTheme = theme);
    this.data.getDefaultColors().subscribe(defaultColors => this.defaultColors = defaultColors);
  }

  ngAfterViewInit() {
    this.isLoaded = this.ndxService.isLoaded;
    if (this.isLoaded) {

      this.chart = dc.geoChoroplethChart(this.chartDiv.nativeElement)
            .width(900)
            .height(500)
            .useViewBoxResizing(true);

      d3.json('assets/data/geo/us-states.json').then((states: any) => {
/*
         const lookup = {
             53 : 'WA',
             41 : 'OR',
             6 : 'CA',
             // ...
         };

         const regions = [
             {name: 'northwest', contains: [ 'WA', 'OR', 'CA' ] }
             // ...
        ];

       // const path: SVGPathElement = [];
         const svg = d3.select('svg');
         svg.selectAll(null)
           .data(regions)
           .enter()
           .append('path')
           .attr('d', (region: any) => {
               const feature = topojson.merge(states, states.objects.states.geometries.filter(state => region.contains.indexOf(lookup[state.id]) > -1));
               return feature.path();
           });
*/
         console.log('chloropleth')
         console.log(dc.config.defaultColors());
         this.chart
              .dimension(this.ndxService.regionDimension)
              .group(this.ndxService.regionValueSumGroup)
              .colors(dc.config.defaultColors())
              // .colors(this.defaultColors.split(','))
              // .colors(['#ccc', '#E2F2FF', '#C4E4FF', '#9ED2FF', '#81C5FF', '#6BBAFF', '#51AEFF', '#36A2FF', '#1E96FF', '#0089FF'])
              // .colors(['#f7fcf5','#e5f5e0','#c7e9c0','#a1d99b','#74c476','#41ab5d','#238b45','#006d2c','#00441b'])
              .colorDomain([0, 20000])
              .overlayGeoJson(states.features, 'region', d => d.properties.region);
          this.chart.render();
      });
    }
  }

  updateChart() {
    this.chart.colors(dc.config.defaultColors()).redraw();
  }

  onResize() {
    this.chart.redraw();
  }

}
