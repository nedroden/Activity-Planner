import { Component, OnInit } from '@angular/core';
import { Activity } from '../activity';
import { ActivityService } from '../activity.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html'
})
export class IndexComponent implements OnInit {

    daynames: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    days = [];
    currentDate: Date = new Date;

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
        this.getActivities();

        document.getElementById('previousWeek').onclick = () => this.changeWeek(-1);
        document.getElementById('nextWeek').onclick = () => this.changeWeek(1);
    }

    changeWeek(modifier: number): void {
        for (let day in this.days)
            this.days[day].date.setTime(this.days[day].date.getTime() + this.weeksToMilliSeconds(modifier * 7));
    }

    getActivities(): void {
        for (let day in this.days)
            this.days[day].activities = this._activityService.getActivities(this.days[day].date);
    }
}
