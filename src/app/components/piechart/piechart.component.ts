import {Component, ViewChild, ElementRef, AfterViewInit, OnInit} from '@angular/core';

// import * as d3 from 'd3';
import * as dc from 'dc';
import {NdxService} from '../../services/ndx.service';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css'],
  providers: []
})
export class PieChartComponent implements OnInit, AfterViewInit {

  public title = 'chart works!';
  public chart: dc.PieChart;
  public isLoaded = false;

  @ViewChild('chartContainer', {static: false}) chartContainer: ElementRef;
  @ViewChild('chartDiv', {static: false}) chartDiv: ElementRef;

  constructor(private ndxService: NdxService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.isLoaded = this.ndxService.isLoaded;
    if (this.isLoaded) {
      this.chart = dc.pieChart(this.chartDiv.nativeElement);
      this.chart
          .width(400).height(220)
          .dimension(this.ndxService.runDimension)
          .group(this.ndxService.speedSumGroup)
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
            chart.render();
          });
      this.chart.render();
    }
  }

  onResize() {
    this.chart.redraw();
  }

}
