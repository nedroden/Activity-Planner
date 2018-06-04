import { Component, OnInit } from '@angular/core';
import { Activity } from '../activity';
import { ActivityService } from '../activity.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-activity-editor',
  templateUrl: './activity-editor.component.html'
})
export class ActivityEditorComponent implements OnInit {

    id: number;
    activity: Activity;

    isNewArticle: boolean = true;

    constructor(private _activityService: ActivityService,
                private _activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        this._activatedRoute.params.subscribe(params => {
            if (params.id)
                this.id = params.id;
            
            this.isNewArticle = params.id === undefined;
        });
        
        if (!this.isNewArticle) {
            this._activityService.getActivity(this.id).subscribe(activity => {
                let startsAt = new Date(activity.starts_at);
                let endsAt = new Date(activity.ends_at);

                activity.start_date_value = startsAt.getFullYear() + '-' + ('0' + (startsAt.getMonth() + 1)).slice(-2) + '-' + ('0' + startsAt.getDate()).slice(-2);
                activity.end_date_value = endsAt.getFullYear() + '-' + ('0' + (endsAt.getMonth() + 1)).slice(-2) + '-' + ('0' + endsAt.getDate()).slice(-2);

                this.activity = activity;
            });
        }
    }

    saveActivity(): void {
        alert('hi');
        //alert(document.getElementById('titleInput').value);
    }
}
