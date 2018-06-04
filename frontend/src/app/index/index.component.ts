import { Component, OnInit } from '@angular/core';
import { Activity } from '../activity';
import { ActivityService } from '../activity.service';

import { Observable } from "rxjs";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html'
})
export class IndexComponent implements OnInit {

    daynames: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    days = [];

    relativeWeek: number = 0;

    // Used for adding or removing a week from a timestamp.
    weeksToMilliSeconds = (modifier: number) => 60 * 60 * 24 * modifier * 1000;

    constructor(private _activityService: ActivityService) {
        this.setupDays();
    }

    setupDays(): void {
        let firstDayDate = new Date();
        firstDayDate.setDate(firstDayDate.getDate() - firstDayDate.getDay());

        for (let i = 0; i < 7; i++) {
            this.days.push({
                name: this.daynames[i],
                date: new Date(),
                activities: []
            });

            this.days[i].date.setTime(firstDayDate.getTime() + this.weeksToMilliSeconds(i));
        }
    }

    ngOnInit(): void {
        this.updateSubscriptions();

        document.getElementById('previousWeek').onclick = () => this.changeWeek(-1);
        document.getElementById('nextWeek').onclick = () => this.changeWeek(1);
    }

    changeWeek(modifier: number): void {
        for (let day in this.days)
            this.days[day].date.setTime(this.days[day].date.getTime() + this.weeksToMilliSeconds(modifier * 7));

        this.updateSubscriptions();
    }

    updateSubscriptions(): void {
        for (let day of this.days)
           this._activityService.getActivities(day.date).subscribe(activities => {
            for (let activity of activities) {
                let startsAt = new Date(activity.starts_at);
                let endsAt = new Date(activity.ends_at);

                // Credits to https://stackoverflow.com/questions/8043026/how-to-format-numbers-by-prepending-0-to-single-digit-numbers#8043061
                activity.start = ('0' + startsAt.getHours()).slice(-2) + ':' + ('0' + startsAt.getMinutes()).slice(-2);
                activity.end = ('0' + endsAt.getHours()).slice(-2) + ':' + ('0' + endsAt.getMinutes()).slice(-2);
            }

            day.activities = activities;
        });
    }
}
