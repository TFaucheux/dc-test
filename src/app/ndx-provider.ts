import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {IData} from './models/Data';
import { catchError, map } from 'rxjs/operators';
import {throwError as observableThrowError} from 'rxjs';
import * as d3 from 'd3';
import * as dc from 'dc';

@Injectable()
export class NdxProvider {

    public data: IData[] = [];
    dataUrl = 'assets/data/data.json';

    constructor(private http: HttpClient) {
        dc.config.defaultColors(d3.scaleOrdinal(d3.schemeBlues[9]));
    }

    public getData(): IData[] {
        console.log(this.data);
        return this.data;
    }

    load() {
        console.log('loading ndx data')
        return new Promise((resolve, reject) => {
            this.http
                .get<IData[]>(this.dataUrl)
                .pipe(map(res => res))
                .subscribe(response => {
                    this.data = response;
                    console.log('ndx loading complete')
                    resolve(true);
                }), catchError(this.handleError);
        });
    }

    private handleError(res: HttpErrorResponse | any) {
        console.error(res.error || res.body.error);
        return observableThrowError(res.error || 'Server error');
    }

}
