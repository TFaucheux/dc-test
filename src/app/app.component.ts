import {Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import * as d3 from 'd3';
import * as dc from 'dc';
import {AppStateService} from './services/AppStateService';
import {of} from 'rxjs';
import {ChloroplethComponent} from './components/chloropleth/chloropleth.component';
import {CompositeChartComponent} from './components/compositechart/compositechart.component';
import {HeatMapComponent} from './components/heatmap/heatmap.component';
import {LineChartComponent} from './components/linechart/linechart.component';
import {PieChartComponent} from './components/piechart/piechart.component';
import {RowChartComponent} from './components/rowchart/rowchart.component';
import {ScatterPlotComponent} from './components/scatterplot/scatterplot.component';
import {SeriesChartComponent} from './components/serieschart/serieschart.component';
import {BoxPlotComponent} from './components/boxplot/boxplot.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./css/font-awesome.min.css',
              './app.css',
              './app.component.css']
})

export class AppComponent implements OnInit, AfterViewInit {

  @ViewChild(ChloroplethComponent, { static: false} ) chloropleth: ChloroplethComponent;
  @ViewChild(CompositeChartComponent, { static: false} ) compositeChart: CompositeChartComponent;
  @ViewChild(HeatMapComponent, { static: false} ) heatMap: HeatMapComponent;
  @ViewChild(LineChartComponent, { static: false} ) lineChart: LineChartComponent;
  @ViewChild(PieChartComponent, { static: false} ) pieChart: PieChartComponent;
  @ViewChild(RowChartComponent, { static: false} ) rowChart: RowChartComponent;
  @ViewChild(ScatterPlotComponent, { static: false} ) scatterPlot: ScatterPlotComponent;
  @ViewChild(SeriesChartComponent, { static: false} ) seriesChart: SeriesChartComponent;
  @ViewChild(BoxPlotComponent, { static: false} ) boxplot: BoxPlotComponent;

  constructor(public data: AppStateService) {
  }

  public defaultTheme: string;
  public defaultColors: string;

  title = 'My title about whatever this is.';
  themes = ['Blues', 'Greens', 'Greys', 'Oranges', 'Purples', 'Reds', 'Spectral',
    'Category10', 'Accent', 'Dark2', 'Paired', 'Pastel1', 'Pastel2',
    'Set1', 'Set2', 'Set3',
    'BrBG', 'PRGn', 'PiYG', 'PuOr', 'RdBu', 'RdGy', 'RdYlBu', 'RdYlGn'];

  ngAfterViewInit() {
    const select = d3.select('#themePicker')
        .append('select')
        .attr('class', 'select')
        .on('change', (data) => this.onChange());

    const options = select
        .selectAll('option')
        .data(this.themes).enter()
        .append('option')
        .text(d => d);

     // this.defaultTheme = 'Greens';
     // this.onChange();
     // console.log('defaultTheme = ' + this.defaultTheme);
     // console.log('defaultColors = ' + this.defaultColors);
  }

  ngOnInit(): void {
    this.data.getTheme().subscribe(theme => this.defaultTheme = theme);
    this.data.getDefaultColors().subscribe(defaultColors => this.defaultColors = defaultColors);
  }

/*
  setTheme(theme: string): void {
    if (this.data != null) {
      this.data.setTheme(theme);
      this.defaultTheme = this.data.getTheme();
      console.log(this.defaultTheme);
      console.log(this.data.getTheme());
    }
    else
      console.log('### this.data:', this.data);
  }

  setColors(colors: any): void {
    if (this.data != null) {
      this.data.setDefaultColors(colors);
      console.log(this.data.getDefaultColors());
    }
    else
      console.log('### this.data:', this.data);
  }
*/

  onChange() {
    const selectValue = d3.select('select').property('value');
    d3.select('#themePicker');
    this.data.setTheme(selectValue);
    this.defaultTheme = selectValue;

    console.log(d3.schemeBlues[9].toString());
    switch (selectValue) {
      case 'Blues': dc.config.defaultColors(d3.scaleOrdinal(d3.schemeBlues[9])); break;
      case 'Greens': dc.config.defaultColors(d3.scaleOrdinal(d3.schemeGreens[9])); break;
      case 'Greys': dc.config.defaultColors(d3.scaleOrdinal(d3.schemeGreys[9])); break;
      case 'Oranges': dc.config.defaultColors(d3.scaleOrdinal(d3.schemeOranges[9])); break;
      case 'Purples': dc.config.defaultColors(d3.scaleOrdinal(d3.schemePurples[9])); break;
      case 'Reds': dc.config.defaultColors(d3.scaleOrdinal(d3.schemeReds[9])); break;
      case 'Spectral': dc.config.defaultColors(d3.scaleOrdinal(d3.schemeSpectral[9])); break;
      //
      case 'Category10': dc.config.defaultColors(d3.scaleOrdinal(d3.schemeCategory10)); break;
      case 'Accent': dc.config.defaultColors(d3.scaleOrdinal(d3.schemeAccent)); break;
      case 'Dark2': dc.config.defaultColors(d3.scaleOrdinal(d3.schemeDark2)); break;
      case 'Paired': dc.config.defaultColors(d3.scaleOrdinal(d3.schemePaired)); break;
      case 'Pastel1': dc.config.defaultColors(d3.scaleOrdinal(d3.schemePastel1)); break;
      case 'Pastel2': dc.config.defaultColors(d3.scaleOrdinal(d3.schemePastel2)); break;
      case 'Set1': dc.config.defaultColors(d3.scaleOrdinal(d3.schemeSet1)); break;
      case 'Set2': dc.config.defaultColors(d3.scaleOrdinal(d3.schemeSet2)); break;
      case 'Set3': dc.config.defaultColors(d3.scaleOrdinal(d3.schemeSet3)); break;
      //
      case 'BrBG': dc.config.defaultColors(d3.scaleOrdinal(d3.schemeBrBG[9])); break;
      case 'PRGn': dc.config.defaultColors(d3.scaleOrdinal(d3.schemePRGn[9])); break;
      case 'PiYG': dc.config.defaultColors(d3.scaleOrdinal(d3.schemePiYG[9])); break;
      case 'PuOr': dc.config.defaultColors(d3.scaleOrdinal(d3.schemePuOr[9])); break;
      case 'RdBu': dc.config.defaultColors(d3.scaleOrdinal(d3.schemeRdBu[9])); break;
      case 'RdGy': dc.config.defaultColors(d3.scaleOrdinal(d3.schemeRdGy[9])); break;
      case 'RdYlBu': dc.config.defaultColors(d3.scaleOrdinal(d3.schemeRdYlBu[9])); break;
      case 'RdYlGn': dc.config.defaultColors(d3.scaleOrdinal(d3.schemeRdYlGn[9])); break;
      default:
        dc.config.defaultColors(d3.scaleOrdinal(d3.schemeBlues[9]));
    }

    // update charts to reflect color changes
    this.chloropleth.updateChart();
    this.compositeChart.updateChart();
    this.heatMap.updateChart();
    this.lineChart.updateChart();
    this.pieChart.updateChart();
    this.rowChart.updateChart();
    this.scatterPlot.updateChart();
    this.seriesChart.updateChart();
    this.boxplot.updateChart();

    // dc.redrawAll();
    // dc.renderAll();
  }
}
