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
import { IPeriod, IProperties, IWeatherResponse } from 'src/utils/interfaces';
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

  districtCode!: TWeatherCode;

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
          this.districtCode = id;
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
          this.weatherInformation = weatherResponse;
          this.loading = false;
          setTimeout(() => {
            this.buildChart();
          }, 500);
        })
    );
  }

  private buildChart(): void {
    console.log('this is the weather response: ', this.weatherInformation);
    const properties: IProperties = this.weatherInformation.properties;

    const xLabels = properties.periods.map((period: IPeriod) => {
      const startTime = new Date(period.startTime);
      const dateLabel = startTime.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        weekday: 'long',
      });
      const splitData = dateLabel.split(',');
      return [splitData[1], splitData[0]];
    });
    const data = properties.periods.map(
      (period: IPeriod) => period.temperature
    );

    const dataSet = {
      labels: xLabels,
      datasets: [
        {
          data: data,
          fill: true,
          borderColor: '#FFCB01',
          tension: 0.1,
          pointRadius: 7,
          backgroundColor: (context: any) => {
            const chart = context.chart;
            const ctx = chart.ctx;
            const gradient = ctx.createLinearGradient(0, 0, 0, chart.height);
            gradient.addColorStop(0, 'rgba(255, 203, 1, 0.2)');
            gradient.addColorStop(1, 'rgba(255, 203, 1, 0)');
            return gradient;
          },
        },
      ],
    };

    const config = {
      type: 'line',
      data: dataSet,
      options: {
        responsive: true,
        layout: {
          padding: {
            top: 50,
          },
        },
        plugins: {
          legend: {
            display: false,
            position: 'top',
            labels: {
              font: {
                size: 20,
                lineHeight: 1.5,
              },
            },
          },
          tooltip: {
            enabled: true,
            mode: 'nearest',
            backgroundColor: '#fff',
            borderColor: '#000',
            borderWidth: 1,
            titleColor: '#000',
            titleFont: {
              size: 20,
            },
            bodyFont: {
              size: 17
            },
            titleMarginBottom: 10,
            padding: 15,
            titleSpacing: 5,
            callbacks: {
              label: function (ctx: any) {
                const value = ctx.formattedValue;
                return `Temperature: ${value} °F`;
              },
              labelTextColor: function (context: any) {
                return '#000';
              }
            },
            displayColors: false,
            yAlign: 'bottom',
            xAlign: 'left',
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Temperature °F',
              font: {
                color: '#181f29',
                size: 25,
                style: 'italic',
              },
            },
            ticks: {
              font: {
                color: '#181f29',
                size: 20,
              },
              padding: 20,
            },
          },
          x: {
            title: {
              display: true,
              text: 'Date',
              font: {
                color: '#181f29',
                size: 25,
              },
            },
            ticks: {
              font: {
                size: 15,
              },
            },
            grid: {
              display: false,
            },
          },
        },
      },
    };

    this.renderChart(config);
  }

  private renderChart(data: any): void {
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
