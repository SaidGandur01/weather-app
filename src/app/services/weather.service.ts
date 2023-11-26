import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TWeatherCode } from 'src/utils/types';
import { Observable } from 'rxjs';
import { IWeatherResponse } from 'src/utils/interfaces';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private readonly baseUrl = 'https://api.weather.gov/gridpoints'

  constructor(private httpClient: HttpClient) { }

  getWeatherDetails(districtCode: TWeatherCode): Observable<IWeatherResponse> {
    const fullUrl = `${this.baseUrl}/${districtCode}/31,80/forecast`;
    return this.httpClient.get<any>(fullUrl)
  }
}
