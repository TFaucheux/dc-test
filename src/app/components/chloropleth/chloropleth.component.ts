import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import * as d3 from 'd3';
import * as dc from 'dc';
import {NdxService} from '../../services/ndx.service';

@Component({
  selector: 'app-chloropleth',
  templateUrl: './chloropleth.component.html',
  styleUrls: ['./chloropleth.component.css'],
  providers: []
})
export class ChloroplethComponent implements OnInit, AfterViewInit {

  public title = 'dc.js sub-chart works!';
  public isLoaded = false;
  public chart: dc.GeoChoroplethChart;

  @ViewChild('chartContainer', {static: false}) chartContainer: ElementRef;
  @ViewChild('chartDiv', {static: false}) chartDiv: ElementRef;

  constructor(public ndxService: NdxService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.isLoaded = this.ndxService.isLoaded;
    if (this.isLoaded) {

      this.chart = dc.geoChoroplethChart(this.chartDiv.nativeElement)
            .width(900)
            .height(500);
            // .on('preRedraw', chart => {
            //   const width: number = this.chartDiv.nativeElement.offsetWidth;
            //   const newWidth: number = this.chartContainer.nativeElement.offsetWidth;
            //   chart.width(newWidth).transitionDuration(0);
            //   chart.transitionDuration(750);
            //  });


      d3.json('assets/data/geo/us-states.json').then((states: any) => {
          // d3.json('assets/data/geo/us-counties.json').then((counties) => {
          // const {features} = states;
          // const features = states;
          this.chart
              .dimension(this.ndxService.stateDimension)
              .group(this.ndxService.stateValueSumGroup)
              .colors(['#ccc', '#E2F2FF', '#C4E4FF', '#9ED2FF', '#81C5FF', '#6BBAFF', '#51AEFF', '#36A2FF', '#1E96FF', '#0089FF'])
              .colorDomain([0, 10000])
              .overlayGeoJson(states.features, 'state', d => d.properties.name)
              // .overlayGeoJson(counties.features, 'county')
              // .title(d => d.key + ' : ' + (d.value ? d.value : 0))
              ;
          this.chart.render();
          // });
      });
    }
  }

  onResize() {
    this.chart.redraw();
  }

}
