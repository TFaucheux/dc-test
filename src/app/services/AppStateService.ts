import { Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {ScaleOrdinal} from 'd3-scale';

@Injectable()
export class AppStateService {

    public  theme: string;
    private themeSubject: BehaviorSubject<string> = new BehaviorSubject('Blues');
    public  themeObservable: Observable<string> = this.themeSubject.asObservable();

    public  defaultColors: string = '';
    private defaultColorsSubject: BehaviorSubject<string> = new BehaviorSubject('');
    public  defaultColorsObservable: Observable<string> = this.defaultColorsSubject.asObservable();

    constructor() {}

    getTheme(): Observable<string> {
         return of(this.theme);
    }

    setTheme(theme: string) {
         this.themeSubject.next(theme);
    }

    getDefaultColors() {
        return of(this.defaultColors);
    }

    setDefaultColors(defaultColors: string) {
        this.defaultColorsSubject.next(defaultColors);
    }

}
