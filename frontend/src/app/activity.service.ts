import { Injectable } from '@angular/core';
import { Observable, interval, pipe } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { Activity } from './activity';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ActivityService {

    constructor(private _http: HttpClient) { }

    public getActivities(date: Date): Observable<Activity[]> {
        return this._http.get<Activity[]>(environment.api_url + '/activities/' + date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate());

        /**
         *  Uncomment to enable real-time data.
         *  return interval(500)
         *      .pipe(
         *          concatMap(() => this._http.get<Activity[]>('http://localhost:8000/activities/' + date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()))
         *  );
         */
    }

    public getActivity(id: number): Observable<Activity> {
        return this._http.get<Activity>(environment.api_url + '/activity/' + id);
    }

    public update(id: number, fields: string[], onSuccess: Function = response => response, onFailure: Function = error => error): void {
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

        // If the id is -1, which is a placeholder, we're dealing with a new article. Set the URL accordingly
        let url = id == -1 ? '/activities' : '/activity/' + id;

        this._http.post(environment.api_url + url, payload, {headers: headers}).subscribe(
            response => onSuccess(response),
            error => onFailure(error)
        );
    }

    public delete(id: number, onSuccess: Function = response => response, onFailure: Function = error => error): void {
        this._http.get(environment.api_url + '/activity/' + id + '/delete').subscribe(
            response => onSuccess(response),
            error => onFailure(error)
        );
    }

    public deleteAttachment(id: number, onSuccess: Function = response => response, onFailure: Function = error => error): void {
        this._http.get(environment.api_url + '/attachment/' + id + '/delete').subscribe(
            response => onSuccess(response),
            error => onFailure(error)
        );
    }
}