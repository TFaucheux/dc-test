import {Component, OnInit, AfterViewInit} from '@angular/core';
import * as d3 from 'd3';
import * as dc from 'dc';
import {ScaleOrdinal} from 'd3';
import {AppStateService} from './services/AppStateService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./css/font-awesome.min.css',
             // './reset.css',
              './app.css',
              './app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  constructor(private data: AppStateService) {
  }

  defaultTheme: string;
  defaultColors: ScaleOrdinal<string, string>;
  // defaultColors: Array<string>;
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

     this.defaultTheme = 'Greens';
     // this.onChange();
     // console.log('defaultTheme = ' + this.defaultTheme);
     // console.log('defaultColors = ' + this.defaultColors);
  }

  ngOnInit(): void {
    // console.log('AppComponent.ngOnInit() - ' + JSON.stringify(this.data))
    this.data.themeObservable.subscribe(theme => this.defaultTheme = theme);
  }

  setTheme(theme: string): void {
    if (this.data != null) {
      this.data.setTheme(theme);
      console.log(this.data.getTheme());
    }
    else
      console.log('### this.data:', this.data);
  }

  onChange() {
    const selectValue = d3.select('select').property('value');
    d3.select('#themePicker');
    this.defaultTheme = selectValue;
    switch (selectValue) {
      case 'Blues':
        this.defaultColors = d3.scaleOrdinal(d3.schemeBlues[9]);
        break;
      case 'Greens':
        this.defaultColors = d3.scaleOrdinal(d3.schemeGreens[9]);
        break;
      case 'Greys':
        this.defaultColors = d3.scaleOrdinal(d3.schemeGreys[9]);
        break;
      case 'Oranges':
        this.defaultColors = d3.scaleOrdinal(d3.schemeOranges[9]);
        break;
      case 'Purples':
        this.defaultColors = d3.scaleOrdinal(d3.schemePurples[9]);
        break;
      case 'Reds':
        this.defaultColors = d3.scaleOrdinal(d3.schemeReds[9]);
        break;
      case 'Spectral':
        this.defaultColors = d3.scaleOrdinal(d3.schemeSpectral[9]);
        break;
      case 'Category10':
        this.defaultColors = d3.scaleOrdinal(d3.schemeCategory10);
        break;
      case 'Accent':
        this.defaultColors = d3.scaleOrdinal(d3.schemeAccent);
        break;
      case 'Dark2':
        this.defaultColors = d3.scaleOrdinal(d3.schemeDark2);
        break;
      case 'Paired':
        this.defaultColors = d3.scaleOrdinal(d3.schemePaired);
        break;
      case 'Pastel1':
        this.defaultColors = d3.scaleOrdinal(d3.schemePastel1);
        break;
      case 'Pastel2':
        this.defaultColors = d3.scaleOrdinal(d3.schemePastel2);
        break;
      case 'Set1':
        this.defaultColors = d3.scaleOrdinal(d3.schemeSet1);
        break;
      case 'Set2':
        this.defaultColors = d3.scaleOrdinal(d3.schemeSet2);
        break;
      case 'Set3':
        this.defaultColors = d3.scaleOrdinal(d3.schemeSet3);
        break;
      case 'BrBG':
        this.defaultColors = d3.scaleOrdinal(d3.schemeBrBG[9]);
        break;
      case 'PRGn':
        this.defaultColors = d3.scaleOrdinal(d3.schemePRGn[9]);
        break;
      case 'PiYG':
        this.defaultColors = d3.scaleOrdinal(d3.schemePiYG[9]);
        break;
      case 'PuOr':
        this.defaultColors = d3.scaleOrdinal(d3.schemePuOr[9]);
        break;
      case 'RdBu':
        this.defaultColors = d3.scaleOrdinal(d3.schemeRdBu[9]);
        break;
      case 'RdGy':
        this.defaultColors = d3.scaleOrdinal(d3.schemeRdGy[9]);
        break;
      case 'RdYlBu':
        this.defaultColors = d3.scaleOrdinal(d3.schemeRdYlBu[9]);
        break;
      case 'RdYlGn':
        this.defaultColors = d3.scaleOrdinal(d3.schemeRdYlGn[9]);
        break;
      default:
        this.defaultColors = d3.scaleOrdinal(d3.schemeBlues[9]);
    }
    this.setTheme(this.defaultTheme);
    console.log(this.data.getTheme());
    dc.redrawAll();
  }
}
