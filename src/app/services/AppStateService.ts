import { Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Injectable()
export class AppStateService {

    private _message: string = 'blank';
    private _messageSubject: BehaviorSubject<string> = new BehaviorSubject('default BehaviorSubject message');
    public  messageObservable: Observable<string> = this._messageSubject.asObservable();

    constructor() {}

    getMessage(): string {
         return this._message;
    }

    setMessage(message: string) {
         // console.log('setMessage()' + message);
         // console.log(this._message);
         // console.log(this._messageSubject);
         this._messageSubject.next(message);
    }

}
