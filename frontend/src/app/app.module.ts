import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { ActivityEditorComponent } from './activity-editor/activity-editor.component';

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
    }
];

@NgModule({
    declarations: [
        AppComponent,
        IndexComponent,
        ActivityEditorComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(
            routes,
            {
                enableTracing: false
            }
        ),
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
