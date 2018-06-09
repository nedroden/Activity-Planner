import { Component, OnInit } from '@angular/core';
import { Activity } from '../activity';
import { ActivityService } from '../activity.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-activity-view',
  templateUrl: './activity-view.component.html'
})
export class ActivityViewComponent implements OnInit {

    id: number;
    activity: Activity;

    constructor(private _activityService: ActivityService,
                private _activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this._activatedRoute.params.subscribe(params => this.id = params.id);
        
        this._activityService.getActivity(this.id).subscribe(activity => {
            activity.starts_at = new Date(activity.starts_at);
            activity.ends_at = new Date(activity.ends_at);

            this.activity = activity;
        });
    }

    delete(): void {
        this._activityService.delete(this.id);
    }
}
