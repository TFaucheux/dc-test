import { Injectable, Input} from '@angular/core';

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

  @Input() runDimension: Dimension<IData, NaturallyOrderedValue>;  // CrossFilter.Dimension<IData, NaturallyOrderedValue>;
  @Input() speedSumGroup: any; // Group<IData, NaturallyOrderedValue, NaturallyOrderedValue>;
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

  initialize() {
    console.log('ndxService: initData() - started');
    this.getData();
    this.completeData();
  }

  completeData() {
    console.log('ndxService: completeData() - this.data:');
    this.ndx = crossfilter(this.data);
    console.log(this.ndx);

    this.runDimension = this.ndx.dimension((d: IData) => +d.run);
    this.speedSumGroup = this.runDimension.group().reduceSum(d => d.speed * d.run / 1000);
    this.isLoaded = true;

    console.log('ndxService: completeData() - this.speedSumGroup.all():');
    console.log(this.speedSumGroup.all());
  }

 initNdxService() {
    console.log('ndxService: initNdxService() - started');
    this.initialize();
  }


}
