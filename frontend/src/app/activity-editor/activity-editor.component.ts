import { Component, OnInit } from '@angular/core';
import { Activity } from '../activity';
import { ActivityService } from '../activity.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { two_digits, trigger_notification } from '../../util';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-activity-editor',
  templateUrl: './activity-editor.component.html'
})
export class ActivityEditorComponent implements OnInit {

    id: number;
    activity: Activity;

    isNewArticle: boolean = true;

    editorForm;

    constructor(private _activityService: ActivityService,
                private _activatedRoute: ActivatedRoute,
                private _router: Router) {
        this.id = -1;
        this.activity = new Activity;

        this.editorForm = new FormGroup({
            'title': new FormControl(this.activity.title, Validators.compose([
                Validators.required,
                Validators.minLength(5)
            ])),
            'location': new FormControl(this.activity.location, Validators.compose([
                Validators.maxLength(50)
            ])),
            'description': new FormControl(this.activity.description, Validators.compose([
                Validators.maxLength(500)
            ])),
            'startDate': new FormControl(this.activity.start_date_value, Validators.compose([
                Validators.required
            ])),
            'startTime': new FormControl(this.activity.start_time_value, Validators.compose([
                Validators.required,
                Validators.pattern('([0-6][0-9])\:([0-6][0-9])')
            ])),
            'endDate': new FormControl(this.activity.end_date_value, Validators.compose([
                Validators.required
            ])),
            'endTime': new FormControl(this.activity.end_time_value, Validators.compose([
                Validators.required,
                Validators.pattern('([0-6][0-9])\:([0-6][0-9])')
            ]))
        });
    }

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

                activity.start_date_value = startsAt.getFullYear() + '-' + two_digits(startsAt.getMonth() + 1) + '-' + two_digits(startsAt.getDate());
                activity.end_date_value = endsAt.getFullYear() + '-' + two_digits(endsAt.getMonth() + 1) + '-' + two_digits(endsAt.getDate());

                activity.start_time_value = two_digits(startsAt.getHours()) + ':' + two_digits(startsAt.getMinutes());
                activity.end_time_value = two_digits(endsAt.getHours()) + ':' + two_digits(endsAt.getMinutes());

                this.activity = activity;
                this.editorForm.patchValue(this.activity);

                this.editorForm.patchValue({
                    startDate: activity.start_date_value,
                    startTime: activity.start_time_value,
                    endDate: activity.end_date_value,
                    endTime: activity.end_time_value
                });
            });
        }

        document.getElementById('submit_form').addEventListener('click', e => {
            e.preventDefault()
            this.saveActivity(e);
        });
    }

    saveActivity(e): void {
        if (this.editorForm.status === 'INVALID')
            return;

        let fields = ['title', 'location', 'startingDate', 'startingTime', 'endDate', 'endTime', 'description', 'attachments'];
        this._activityService.update(this.id, fields,
            result => {
                if (result === null || Object.keys(result).length === 0)
                    trigger_notification('error', 'Could not save activity', 4000, 'danger');
                else
                    this._router.navigateByUrl('/activity/' + result.id);
            },
            error => trigger_notification('error', 'Could not save activity')
        );
    }

    deleteAttachment(id: number): void {
        document.getElementById('attachment-' + id).remove();
        this._activityService.deleteAttachment(id);
        trigger_notification('error', 'The attachment was deleted', 4000, 'success');
    }
}
