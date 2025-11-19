import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  showHeader = true;

  constructor(private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {

        const hideOnRoutes = ['/', ''];

        this.showHeader = !hideOnRoutes.includes(event.urlAfterRedirects);
      }
    });
  }
}
