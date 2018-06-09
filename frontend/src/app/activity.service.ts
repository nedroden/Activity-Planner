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
        return interval(5000)
            .pipe(
                concatMap(() => this._http.get<Activity[]>('http://localhost:8000/activities/' + date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()))
            );
    }

    public getActivity(id: number): Observable<Activity> {
        return this._http.get<Activity>('http://localhost:8000/activity/' + id);
    }

    public update(id: number, fields: string[], callback: Function = function(response) {}): boolean {
        let payload = {};
        let headers = new HttpHeaders();

        fields.forEach(field => payload[field] = (<HTMLInputElement>document.getElementById(field + 'Input')).value);
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        let url = id == -1 ? '/activities' : '/activity/' + id;

        this._http.post('http://localhost:8000' + url, payload, {headers: headers}).subscribe(response => callback(response));

        return true;
    }
}