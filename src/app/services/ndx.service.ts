import { ComponentFactoryResolver, Injectable, Input} from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, Subject } from 'rxjs';
import {  map } from 'rxjs/operators';

import * as CrossFilter from 'crossfilter2';
import * as crossfilter from 'crossfilter2';
import {NaturallyOrderedValue, Dimension, Group, Crossfilter} from 'crossfilter2';
import {IData} from '../models/Data';
import {ChartComponent} from '../components/chart/chart.component';

@Injectable()
export class NdxService {

  private ndx: CrossFilter.Crossfilter<IData>;
  dataUrl = 'assets/data/data.json';

  public isLoaded = false;
  public Data: Subject<Array<IData>> = new BehaviorSubject<Array<IData>>([]);
  public data: Array<IData>;

  @Input() runDimension: Dimension<IData, NaturallyOrderedValue>;  // CrossFilter.Dimension<IData, NaturallyOrderedValue>;
  @Input() speedSumGroup: any; // Group<IData, NaturallyOrderedValue, NaturallyOrderedValue>;
  // @Input() speedSumGroup: CrossFilter.Group<IData, NaturallyOrderedValue, NaturallyOrderedValue>;

  constructor(private http: HttpClient,
              private resolver: ComponentFactoryResolver) {
    console.log('ndxService: constructor() - ndxService');
    this.initNdxService();
  }
/*
  getData(): Observable<IData[]> {
    console.log('ndxService: getData() - started');
    return this.http.get(this.dataUrl).pipe(map(res => res as IData[]));
  }
*/
  private createBarChart(): void {
    const factory = this.resolver.resolveComponentFactory(ChartComponent);
  }


  // load data and call method on complete
  loadAllData() {
    this.http
      .get(this.dataUrl)
      .pipe(map((res: any) => {
        return res;
      }))
      .subscribe (
        (data: IData[]) => {
          this.data = data;
          // this.postData.next(posts);
          // console.log('loadAllPosts() - posts ' + JSON.stringify(posts));
          // console.log('loadAllPosts() - this.posts ' + JSON.stringify(this.posts));
        },
        (err: any) => console.error('ndxService: loadAllData: ERROR'),
        () => { this.completeData(); }
      );
  }


  initialize() {
    console.log('ndxService: initData() - started');
    // subscribe to the postsData Stream
    this.Data.subscribe(( data: Array<IData>) => {

      // mimic a slow connection
      setTimeout(() => {
        // set data
        this.data = data;
      }, 5000);
    });

    // make the http request
    this.loadAllData();
  }

  completeData() {
    console.log('ndxService: completeData() - this.data:');
    console.log(this.data);
    this.ndx =  crossfilter(this.data);
    console.log('ndxService: completeData() - this.ndx:');
    console.log(this.ndx);
    this.runDimension = this.ndx.dimension((d: IData) => +d.run);
    this.speedSumGroup = this.runDimension.group().reduceSum(d => d.speed * d.run / 1000);
    this.isLoaded = true;
    /*
    this.speedSumGroup = this.runDimension.group().reduce(
      //add
      (p: IDataExtended, v:IData) => {
        ++p.count;
        p.review_sum += v.review_count;
        p.star_sum += v.stars;
        p.review_avg = p.review_sum / p.count;
        p.star_avg = p.star_sum / p.count;
        return p;
      },
      //remove
      (p: IDataExtended, v:IData) => {
        --p.count;
        p.review_sum -= v.review_count;
        p.star_sum -= v.stars;
        p.review_avg = p.review_sum / p.count;
        p.star_avg = p.star_sum / p.count;
        return p;
      },
      //init
      () => {
        return {count: 0, review_sum: 0, star_sum: 0, review_avg: 0, star_avg: 0};
      }
    );
     */

    console.log('ndxService: completeData() - this.speedSumGroup.all():');
    console.log(this.speedSumGroup.all());
    this.createBarChart();
  }

 initNdxService() {
    console.log('ndxService: initNdxService() - started');
    this.initialize();
  }

}
