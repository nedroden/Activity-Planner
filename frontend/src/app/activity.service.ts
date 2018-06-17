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
        return this._http.get<Activity[]>('http://localhost:8000/activities/' + date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate());
        /*return interval(5000)
            .pipe(
                concatMap(() => this._http.get<Activity[]>('http://localhost:8000/activities/' + date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()))
            );*/
    }

    public getActivity(id: number): Observable<Activity> {
        return this._http.get<Activity>('http://localhost:8000/activity/' + id);
    }

    public update(id: number, fields: string[], onSuccess: Function = response => response, onFailure: Function = error => error): boolean {
        let payload = new FormData();
        let headers = new HttpHeaders();

        fields.forEach(field => {
            let input = <HTMLInputElement>document.getElementById(field + 'Input');
            let value;

            switch (input.type) {
                case 'file':
                    for (let i = 0; i < input.files.length; i++)
                        payload.append('attachments[]', input.files[i]);

                    break;
                default:
                    payload.append(field, input.value);
            }
        });

        headers.append('Content-Type', 'multipart/form-data');

        let url = id == -1 ? '/activities' : '/activity/' + id;

        this._http.post('http://localhost:8000' + url, payload, {headers: headers}).subscribe(
            response => onSuccess(response),
            error => onFailure(error)
        );

        return true;
    }

    public delete(id: number) {
        this._http.get('http://localhost:8000/activity/' + id + '/delete').subscribe(response => console.log(response));
    }

    public deleteAttachment(id: number) {
        this._http.get('http://localhost:8000/attachment/' + id + '/delete').subscribe(response => console.log(response));
    }
}