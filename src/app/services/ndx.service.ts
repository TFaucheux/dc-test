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
  @Input() speedSumGroup: any; 
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

    this.runDimension = this.ndx.dimension((d: IData) => +d.run);
    this.speedSumGroup = this.runDimension.group().reduceSum(d => d.speed * d.run / 1000);
    this.isLoaded = true;

    console.log('ndxService: completeData() - this.speedSumGroup.all():');
    console.log(this.speedSumGroup.all());
  }

 initNdxService() {
    console.log('ndxService: initNdxService() - started');
    this.getData();
    this.groupData();
  }

 find_query = function () {
    var _map = window.location.search.substr(1).split('&').map(function (a) {
        return a.split('=');
    }).reduce(function (p, v) {
        if (v.length > 1)
            p[v[0]] = decodeURIComponent(v[1].replace(/\+/g, " "));
        else
            p[v[0]] = true;
        return p;
    }, {});
    return function (field) {
        return _map[field] || null;
    };
}();


 apply_resizing(chart, adjustX, adjustY, onresize) {
    const resizeMode = this.find_query('resize') || 'widhei';
    if (resizeMode.toLowerCase() === 'viewbox') {
        chart
            .width(600)
            .height(400)
            .useViewBoxResizing(true);
        d3.select(chart.anchor()).classed('fullsize', true);
    } else {
        adjustX = adjustX || 0;
        adjustY = adjustY || adjustX || 0;
        chart
            .width(window.innerWidth - adjustX)
            .height(window.innerHeight - adjustY);
        window.onresize = function () {
            if (onresize) {
                onresize(chart);
            }
            chart
                .width(window.innerWidth - adjustX)
                .height(window.innerHeight - adjustY);

            if (chart.rescale) {
                chart.rescale();
            }
            chart.redraw();
        };
    }
}


}
