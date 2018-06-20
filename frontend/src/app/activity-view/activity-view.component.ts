import { Component, OnInit } from '@angular/core';
import { Activity } from '../activity';
import { ActivityService } from '../activity.service';
import { ActivatedRoute, Router } from '@angular/router';

import { trigger_notification } from '../../util';

@Component({
  selector: 'app-activity-view',
  templateUrl: './activity-view.component.html'
})
export class ActivityViewComponent implements OnInit {

    id: number;
    activity: Activity;

    constructor(private _activityService: ActivityService,
                private _activatedRoute: ActivatedRoute,
                private _router: Router) {}

    ngOnInit() {
        this.activity = new Activity;
        this._activatedRoute.params.subscribe(params => this.id = params.id);
        
        this._activityService.getActivity(this.id).subscribe(
            activity => {
                if (Object.keys(activity).length === 0) {
                    this._router.navigate(['/404']);
                    return;
                }

                activity.starts_at = new Date(activity.starts_at);
                activity.ends_at = new Date(activity.ends_at);

                this.activity = activity;
            },
            error => this._router.navigate(['/404'])
        );
    }

    delete(): void {
        this._activityService.delete(this.id,
            response => trigger_notification('error', 'The activity was deleted', 4000, 'success'),
            error => trigger_notification('error', 'Could not delete activity', 4000, 'danger')
        );

        this._router.navigate(['/']);
    }
}
