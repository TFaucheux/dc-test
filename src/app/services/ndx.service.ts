import { Injectable, Input} from '@angular/core';

import * as d3 from 'd3';
import * as CrossFilter from 'crossfilter2';
import * as crossfilter from 'crossfilter2';
import {NaturallyOrderedValue, Dimension, Group, Crossfilter} from 'crossfilter2';

import {IData} from '../models/Data';
import {NdxProvider} from '../ndx-provider';

@Injectable()
export class NdxService {

  private ndx: CrossFilter.Crossfilter<IData>;
  public data: IData[] = [];
  public isLoaded = false;

  @Input() runDimension: Dimension<IData, NaturallyOrderedValue>;
  @Input() runSpeedDimension: Dimension<IData, NaturallyOrderedValue>;
  @Input() expt2Dimension: Dimension<IData, NaturallyOrderedValue>;
  @Input() exptDimension: Dimension<IData, NaturallyOrderedValue>;

  @Input() exptGroup: any;
  @Input() speedGroup: any;

  @Input() speedArrayGroup: any;

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
    console.log('ndxService: completeData() - this.data:');
    this.ndx = crossfilter(this.data);
    console.log(this.ndx);

    this.runSpeedDimension = this.ndx.dimension((d: IData) => { return [+d.run, +d.speed];});
    this.runDimension = this.ndx.dimension((d: IData) => { return +d.run});
    this.exptDimension = this.ndx.dimension(d => 'exp-' + d.expt);
    this.expt2Dimension = this.ndx.dimension((d: IData) => { return +d.expt});
    this.speedGroup = this.runSpeedDimension.group().reduceSum( d => (d.speed * d.run / 1000) * Math.floor(Math.random() * (1000)) + 1);
    this.speedSumGroup = this.runDimension.group().reduceSum(d => d.speed * d.run / 1000);
    this.exptSumGroup = this.runDimension.group().reduceSum(d => d.speed * d.expt / 1000);

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

    this.average = d => d.n ? d.tot / d.n : 0;
    this.expCount = d => d.n;

    this.isLoaded = true;

    console.log('ndxService: completeData() - this.speedSumGroup.all():');
    console.log(this.exptSumGroup.all());
    console.log(this.speedSumGroup.all());
    console.log(this.speedGroup.all());
    console.log(this.exptGroup.all());
  }

 initNdxService() {
    console.log('ndxService: initNdxService() - started');
    this.getData();
    this.groupData();
  }

}
