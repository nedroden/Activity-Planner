import { Injectable } from '@angular/core';
import { Observable, interval, pipe } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { Activity } from './activity';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ActivityService {

    constructor(private _http: HttpClient) { }

    public getActivities(date: Date): Observable<Activity[]> {
        return interval(500)
        .pipe(
            concatMap(() => this._http.get<Activity[]>('http://localhost:8000/activities/' + date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()))
        );
    }
}