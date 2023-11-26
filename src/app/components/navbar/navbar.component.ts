import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription, filter, map, of } from 'rxjs';
import { TItems, TWeatherCode } from 'src/utils/types';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  subscription: Subscription[] = [];

  currentSelection: TItems = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((res): res is NavigationEnd => res instanceof NavigationEnd),
        map((res: NavigationEnd) => {
          return res.url;
        })
      )
      .subscribe((url) => {
        if (url) {
          const splitData = url.split('/');
          const itemsMap: { [ey: string]: TItems } = {
            LWX: 'columbia',
            TOP: 'kansas',
          };
          this.currentSelection = itemsMap[splitData[2]];
        }
      });
  }

  onItemSelected(selection: TItems, code: TWeatherCode): void {
    this.currentSelection = selection;
    this.router.navigate(['weather', code]);
  }

  goToHomePage(): void {
    this.currentSelection = '';
    this.router.navigate(['home']);
  }
}
