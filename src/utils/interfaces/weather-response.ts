export interface IWeatherResponse {
  "@context": Array<IContextClass | string>;
  type:       string;
  geometry:   IGeometry;
  properties: IProperties;
}

export interface IContextClass {
  "@version": string;
  wx:         string;
  geo:        string;
  unit:       string;
  "@vocab":   string;
}

export interface IGeometry {
  type:        string;
  coordinates: Array<Array<number[]>>;
}

export interface IProperties {
  updated:           Date;
  units:             string;
  forecastGenerator: string;
  generatedAt:       Date;
  updateTime:        Date;
  validTimes:        string;
  elevation:         IElevation;
  periods:           IPeriod[];
}

export interface IElevation {
  unitCode: UnitCode;
  value:    number | null;
}

export enum UnitCode {
  WmoUnitDegC = "wmoUnit:degC",
  WmoUnitM = "wmoUnit:m",
  WmoUnitPercent = "wmoUnit:percent",
}

export interface IPeriod {
  number:                     number;
  name:                       string;
  startTime:                  Date;
  endTime:                    Date;
  isDaytime:                  boolean;
  temperature:                number;
  temperatureUnit:            TemperatureUnit;
  temperatureTrend:           null;
  probabilityOfPrecipitation: IElevation;
  dewpoint:                   IElevation;
  relativeHumidity:           IElevation;
  windSpeed:                  string;
  windDirection:              string;
  icon:                       string;
  shortForecast:              string;
  detailedForecast:           string;
}

export enum TemperatureUnit {
  F = "F",
}