import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Activity } from './activity';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ActivityService {

    constructor(private _http: HttpClient) { }

    public getActivities(date: Date): Observable<Activity[]> {
        return this._http.get<Activity[]>('http://localhost:8000/activities/2018-06-03');
    }
}