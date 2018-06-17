import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { ActivityEditorComponent } from './activity-editor/activity-editor.component';
import { ActivityViewComponent } from './activity-view/activity-view.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/index'
    },
    {
        path: 'index',
        component: IndexComponent
    },
    {
        path: 'new',
        component: ActivityEditorComponent
    },
    {
        path: 'activity/:id',
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: ActivityViewComponent
            },
            {
                path: 'edit',
                component: ActivityEditorComponent
            }
        ]
    }
];

@NgModule({
    declarations: [
        AppComponent,
        IndexComponent,
        ActivityEditorComponent,
        ActivityViewComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(
            routes,
            {
                enableTracing: false
            }
        ),
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
