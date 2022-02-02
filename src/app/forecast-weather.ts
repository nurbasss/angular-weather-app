import { WeatherInfo } from "./current-weather";

export interface ForecastWeather {
    daily: ForecastItem[]
}

export interface ForecastItem {
    dt: number;
    temp: {
        min: number,
        max: number,
    }
    weather: WeatherInfo[]
}
