import {Component, OnInit, AfterViewInit} from '@angular/core';
import * as d3 from 'd3';
import * as dc from 'dc';
import {AppStateService} from './services/AppStateService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./css/font-awesome.min.css',
              './app.css',
              './app.component.css']
})

export class AppComponent implements OnInit, AfterViewInit {

  constructor(private data: AppStateService) {
  }

  defaultTheme: string;
  defaultColors: any;
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
    this.data.themeObservable.subscribe(theme => this.defaultTheme = theme);
    this.data.defaultColorsObservable.subscribe(defaultColors => this.defaultColors = defaultColors);
  }

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


  onChange() {
    const selectValue = d3.select('select').property('value');
    d3.select('#themePicker');
    this.defaultTheme = selectValue;
    switch (selectValue) {
      case 'Blues':
        this.data.setDefaultColors(d3.schemeBlues[9].slice());
        break;
      case 'Greens':
        this.data.setDefaultColors(d3.schemeGreens[9].slice());
        break;
      case 'Greys':
        this.data.setDefaultColors(d3.schemeGreys[9].slice());
        break;
      case 'Oranges':
        this.data.setDefaultColors(d3.schemeOranges[9].slice());
        break;
      case 'Purples':
        this.data.setDefaultColors(d3.schemePurples[9].slice());
        break;
      case 'Reds':
        this.data.setDefaultColors(d3.schemeReds[9].slice());
        break;
      case 'Spectral':
        this.data.setDefaultColors(d3.schemeSpectral[9].slice());
        break;
      case 'Category10':
        this.data.setDefaultColors(d3.schemeCategory10.slice());
        break;
      case 'Accent':
        this.data.setDefaultColors(d3.schemeAccent.slice());
        break;
      case 'Dark2':
        this.data.setDefaultColors(d3.schemeDark2.slice());
        break;
      case 'Paired':
        this.data.setDefaultColors(d3.schemePaired.slice());
        break;
      case 'Pastel1':
        this.data.setDefaultColors(d3.schemePastel1.slice());
        break;
      case 'Pastel2':
        this.data.setDefaultColors(d3.schemePastel2.slice());
        break;
      case 'Set1':
        this.data.setDefaultColors(d3.schemeSet1.slice());
        break;
      case 'Set2':
        this.data.setDefaultColors(d3.schemeSet2.slice());
        break;
      case 'Set3':
        this.data.setDefaultColors(d3.schemeSet3.slice());
        break;
      case 'BrBG':
        this.data.setDefaultColors(d3.schemeBrBG[9].slice());
        break;
      case 'PRGn':
        this.data.setDefaultColors(d3.schemePRGn[9].slice());
        break;
      case 'PiYG':
        this.data.setDefaultColors(d3.schemePiYG[9].slice());
        break;
      case 'PuOr':
        this.data.setDefaultColors(d3.schemePuOr[9].slice());
        break;
      case 'RdBu':
        this.data.setDefaultColors(d3.schemeRdBu[9].slice());
        break;
      case 'RdGy':
        this.data.setDefaultColors(d3.schemeRdGy[9].slice());
        break;
      case 'RdYlBu':
        this.data.setDefaultColors(d3.schemeRdYlBu[9].slice());
        break;
      case 'RdYlGn':
        this.data.setDefaultColors(d3.schemeRdYlGn[9].slice());
        break;
      default:
        this.data.setDefaultColors(d3.schemeBlues[9].slice());
    }
    console.log(this.data.getTheme());
    console.log(this.data.getDefaultColors());
    this.setTheme(this.defaultTheme);
    this.setColors(this.data.getDefaultColors());
    console.log(this.data.getTheme());
    console.log(this.data.getDefaultColors());
    dc.redrawAll();
  }
}
