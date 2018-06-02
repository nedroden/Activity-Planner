import { Injectable } from '@angular/core';
import { Activity } from './activity';

@Injectable({
    providedIn: 'root'
})
export class ActivityService {

    constructor() { }

    public getActivities(date: Date): Activity[] {
        let activities: Activity[] = [];

        switch (date.getDay()) {
            case 0:
                activities.push({
                    id: 0,
                    title: "Recover from hangover",
                    description: "Recovering from a hangover.",

                    startingTime: "10:00",
                    endTime: "15:00"
                });
                break;
            case 1:
                activities.push({
                    id: 0,
                    title: "Give a presentation",
                    description: "I need to give a presentation",

                    startingTime: "14:00",
                    endTime: "15:00"
                });

                activities.push({
                    id: 0,
                    title: "Go to the shopping mall",
                    description: "I should probably go to the shopping mall",

                    startingTime: "15:00",
                    endTime: "17:00"
                });
                break;
        }

        return activities;
    }
}
