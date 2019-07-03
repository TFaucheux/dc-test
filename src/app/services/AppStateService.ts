import { Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ScaleOrdinal} from 'd3-scale';

@Injectable()
export class AppStateService {

    private _theme: string;
    private _themeSubject: BehaviorSubject<string> = new BehaviorSubject('Blues');
    public  themeObservable: Observable<string> = this._themeSubject.asObservable();

    private _defaultColors: any = [];
    private _defaultColorsSubject: BehaviorSubject<any> = new BehaviorSubject([]);
    public  defaultColorsObservable: Observable<any> = this._defaultColorsSubject.asObservable();

    constructor() {}

    getTheme(): string {
         return this._theme;
    }

    setTheme(theme: string) {
         this._themeSubject.next(theme);
    }

    getDefaultColors() {
        return this._defaultColors;
    }

    setDefaultColors(defaultColors: any) {
        this._defaultColorsSubject.next(defaultColors);
    }

}
