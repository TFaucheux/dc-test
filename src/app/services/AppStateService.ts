import { Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable()
export class AppStateService {

    private _theme: string;
    private _themeSubject: BehaviorSubject<string> = new BehaviorSubject('Blues');
    public  themeObservable: Observable<string> = this._themeSubject.asObservable();

    private _defaultColors: any;
    private _defaultColorsSubject: BehaviorSubject<string> = new BehaviorSubject('default');
    public  defaultColorsObservable: Observable<string> = this._defaultColorsSubject.asObservable();


    constructor() {}

    getTheme(): string {
         return this._theme;
    }

    setTheme(theme: string) {
         this._themeSubject.next(theme);
    }

}
