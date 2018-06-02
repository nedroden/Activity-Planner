import { Component, OnInit } from '@angular/core';
import { Activity } from '../activity';
import { ActivityService } from '../activity.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html'
})
export class IndexComponent implements OnInit {

    dates: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    activities: Activity[];
    currentDate: Date = new Date;
    firstDayDate: Date = new Date;

    constructor(private _activityService: ActivityService) {
        this.firstDayDate.setDate(this.firstDayDate.getDate() - this.firstDayDate.getDay());
    }

    ngOnInit() {
        this.getActivities();
    }

    nextWeek(): void {
        this.firstDayDate.setDate(this.firstDayDate.getDate() + 7);
    }

    getActivities(): void {
        this.activities = this._activityService.getActivities(this.firstDayDate);
    }
}
