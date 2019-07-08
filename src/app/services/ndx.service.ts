import { Injectable, Input} from '@angular/core';

import * as d3 from 'd3';
import * as dc from 'dc';
import * as CrossFilter from 'crossfilter2';
import * as crossfilter from 'crossfilter2';
import {NaturallyOrderedValue, Dimension, Group, Crossfilter} from 'crossfilter2';

import {IData} from '../models/Data';
import {NdxProvider} from '../ndx-provider';

@Injectable()
export class NdxService {

  public ndx: CrossFilter.Crossfilter<IData>;
  public data: IData[] = [];
  public isLoaded = false;

  public all: any; // = this.ndx.groupAll();

  @Input() regionDimension: Dimension<IData, NaturallyOrderedValue>;
  @Input() regionPieDimension: Dimension<IData, NaturallyOrderedValue>;
  @Input() stateDimension: Dimension<IData, NaturallyOrderedValue>;
  @Input() runDimension: Dimension<IData, NaturallyOrderedValue>;
  @Input() exptRunDimension: Dimension<IData, NaturallyOrderedValue>;
  @Input() runSpeedDimension: Dimension<IData, NaturallyOrderedValue>;
  @Input() expt2Dimension: Dimension<IData, NaturallyOrderedValue>;
  @Input() exptDimension: Dimension<IData, NaturallyOrderedValue>;

  @Input() regionValueSumGroup: any;
  @Input() regionPieGroup: any;
  @Input() regionGroup: any;
  @Input() stateValueSumGroup: any;
  @Input() stateGroup: any;
  @Input() runGroup: any;
  @Input() exptGroup: any;
  @Input() speedGroup: any;

  @Input() speedArrayGroup: any;

  @Input() speedExptSumGroup: any; // Group<IData, NaturallyOrderedValue, NaturallyOrderedValue>;
  @Input() speedSumGroup: any;
  @Input() exptSumGroup: any;

  @Input() meanSpeedGroup: any;
  @Input() average: any;
  @Input() expCount: any;

  // @Input() speedSumGroup: CrossFilter.Group<IData, NaturallyOrderedValue, NaturallyOrderedValue>;

  constructor(private ndxProvider: NdxProvider) {
    console.log('ndxService: constructor() - ndxService');
    this.initNdxService();
  }

  getData(): IData[] {
    console.log('ndxService: getData() - started');
    this.data = this.ndxProvider.data;
    // console.log(this.data);
    return this.data;
  }

  groupData() {
    console.log('ndxService: groupData() - started');
    this.ndx = crossfilter(this.data);
    this.all = this.ndx.groupAll();

    // Dimensions
    this.regionDimension = this.ndx.dimension((d) => {return d.region;});
    this.regionPieDimension = this.ndx.dimension((d) => {return d.region;});
    this.stateDimension = this.ndx.dimension((d) => {return d.state;});

    this.expt2Dimension = this.ndx.dimension((d: IData) => { return +d.expt;});
    this.runDimension = this.ndx.dimension((d: IData) => { return +d.run;});
    this.runSpeedDimension = this.ndx.dimension((d: IData) => [+d.run, +d.speed]);
    this.exptRunDimension = this.ndx.dimension((d: IData) => [+d.expt, +d.run]);
    this.exptDimension = this.ndx.dimension(d => 'exp-' + d.expt);

    // Groups
    this.stateGroup = this.stateDimension.group();
    this.regionGroup = this.regionDimension.group();
    this.regionPieGroup = this.regionDimension.group();
    this.regionValueSumGroup = this.regionDimension.group().reduceSum((d) => d.speed);
    this.stateValueSumGroup = this.stateDimension.group().reduceSum((d) => d.speed);

    this.speedGroup = this.runSpeedDimension.group().reduceSum( d => (d.speed * d.run / 1000) * Math.floor(Math.random() * (1000)) + 1);
    this.speedSumGroup = this.runDimension.group().reduceSum(d => d.speed * d.run / 1000);
    this.exptSumGroup = this.runDimension.group().reduceSum(d => d.speed * d.expt / 1000);
    this.runGroup = this.exptRunDimension.group().reduceSum(d => +d.speed);

    // Custom Groups
    this.speedArrayGroup  = this.exptDimension.group().reduce(
        (p: any, v: any) => {
              p.push(v.speed);
              return p;
            },
        (p: any, v: any) => {
              p.splice(p.indexOf(v.speed), 1);
              return p;
            },
        () => []
    );

      this.speedExptSumGroup = this.runDimension.group().reduce((p, v) => {
          p[v.expt] = (p[v.expt] || 0) + v.speed;
          return p;
      }, (p, v) => {
          p[v.expt] = (p[v.expt] || 0) - v.speed;
          return p;
      }, () => ({}));

     this.exptGroup = this.expt2Dimension.group().reduce(
         (p: any, v: any) => {
              ++p.expt;
              p.total += +v.speed;
              p.avg = Math.round(p.total / p.expt);
              return p;
          },
         (p: any, v: any) => {
              --p.expt;
              p.total -= +v.speed;
              p.avg = (p.expt === 0) ? 0 : Math.round(p.total / p.expt);
              return p;
          },
         () => ({expt: 0, total: 0, avg: 0}));


      this.meanSpeedGroup = this.ndx.groupAll().reduce(
        (p: IData, v: IData) => {
          ++p.n;
          p.tot += v.speed;
          return p;
        },
        (p: IData, v: IData) => {
          --p.n;
          p.tot -= v.speed;
          return p;
        },
        () => ({n: 0, tot: 0})
    );

    // Summary Stat Functions
    this.average = d => d.n ? d.tot / d.n : 0;
    this.expCount = d => d.n;

    // isLoaded should be True after data is completed loading
    this.isLoaded = true;

    // Log out Group data for diagnostics if needed
    // console.log('ndxService: completeData() - this.speedSumGroup.all():');
    // console.log(this.speedSumGroup.all());
    // console.log(this.speedArrayGroup.all());
    // console.log(this.speedGroup.all());
    // console.log(this.exptGroup.all());
    // console.log(this.exptSumGroup.all());
    // console.log(this.runGroup.all());
    // console.log(this.speedExptSumGroup.all());
    // console.log(this.regionValueSumGroup.all());
    // console.log(this.regionGroup.all());
    // console.log(this.stateValueSumGroup.all());
  }

 resetAll() {
     dc.filterAll();
     dc.renderAll();
 }

 // Initialize routine to call from Service Constructor()
 initNdxService() {
    console.log('ndxService: initNdxService() - started');
    // dc.config.defaultColors(d3.scaleOrdinal(d3.schemeBlues[9]));
    this.getData();
    this.groupData();

  }

}
