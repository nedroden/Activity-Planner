import { Injectable } from '@angular/core';
import { Activity } from './activity';

@Injectable({
    providedIn: 'root'
})
export class ActivityService {

    constructor() { }

    public getActivities(date: Date) {
        return [];
    }
}
