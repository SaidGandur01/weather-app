import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { WeatherService } from '../services/weather.service';
import { TWeatherCode } from 'src/utils/types';
import { Chart, registerables } from 'chart.js';
import { IWeatherResponse } from 'src/utils/interfaces';
Chart.register(...registerables);

@Component({
  selector: 'app-weather-page',
  templateUrl: './weather-page.component.html',
  styleUrls: ['./weather-page.component.scss'],
})
export class WeatherPageComponent implements OnInit, OnDestroy {
  loading = true;
  subscription: Subscription[] = [];

  @Input()
  height = 200;

  weatherInformation!: IWeatherResponse;

  @ViewChild('lineChart', { static: false, read: ElementRef })
  lineChartReference!: ElementRef;

  lineChartInstance!: Chart;

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
        .subscribe((weatherResponse: IWeatherResponse) => {
          this.loading = false;
          this.weatherInformation = weatherResponse;
          setTimeout(() => {
            this.buildChart();
          }, 500);
        })
    );
  }

  private buildChart(): void {
    console.log('this is the weather response: ', this.weatherInformation);

    const labels = ['Jan', 'Feb', 'Mar', 'May', 'Jun', 'Jul', 'Aug'];
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'My First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ],
    };

    const config = {
      type: 'line',
      data: data,
    };

    this.renderChart(config);
  }

  private renderChart(data: any): void {
    console.log('aca: ', this.lineChartReference);
    if (this.lineChartReference) {
      const ctx = this.lineChartReference.nativeElement.getContext('2d');
      this.destroyChart();
      this.lineChartInstance = new Chart(ctx, data);
    }
  }

  private destroyChart(): void {
    if (this.lineChartInstance) {
      this.lineChartInstance.destroy();
    }
  }

  goToHomePage(): void {
    this.router.navigate(['home']);
  }

  ngOnDestroy(): void {
    this.subscription.map((subscription: Subscription) => {
      subscription.unsubscribe();
    });
    this.destroyChart();
  }
}
