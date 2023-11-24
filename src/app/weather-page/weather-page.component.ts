import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-weather-page',
  templateUrl: './weather-page.component.html',
  styleUrls: ['./weather-page.component.scss']
})
export class WeatherPageComponent implements OnInit, OnDestroy {

  subscription: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.subscription.push(
      this.route.paramMap.subscribe((params: ParamMap) => {
        const id = params.get('id');
        if (id) {
          this.getWeatherInformation(id);
        }
      })
    )
  }

  getWeatherInformation(id: string): void {
    console.log('this is the id from path url in weather page: ', id)
  }

  goToHomePage(): void {
    this.router.navigate(['home']);
  }

  ngOnDestroy(): void {
      
  }

}
