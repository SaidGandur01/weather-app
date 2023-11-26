import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WeatherService } from '../services/weather.service';
import { TWeatherCode } from 'src/utils/types';

@Component({
  selector: 'app-weather-page',
  templateUrl: './weather-page.component.html',
  styleUrls: ['./weather-page.component.scss'],
})
export class WeatherPageComponent implements OnInit, OnDestroy {

  loading = true;
  subscription: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private weatherService: WeatherService
  ) {}

  ngOnInit(): void {
    this.subscription.push(
      this.route.paramMap.subscribe((params: ParamMap) => {
        const id = params.get('id') as TWeatherCode;
        if (id) {
          this.getWeatherInformation(id);
        }
      })
    );
  }

  getWeatherInformation(districtCode: TWeatherCode): void {
    this.subscription.push(
      this.weatherService
        .getWeatherDetails(districtCode)
        .subscribe((weatherResponse) => {
          this.loading = false
          console.log('this is the weather response: ', weatherResponse);
        })
    );
  }

  goToHomePage(): void {
    this.router.navigate(['home']);
  }

  ngOnDestroy(): void {
    this.subscription.map((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }
}
