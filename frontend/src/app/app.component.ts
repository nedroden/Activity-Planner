import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

    menuItems = [
        {
            label: "Home",
            href: ""
        },
        {
            label: "New activity",
            href: "/new"
        }
    ];
}
