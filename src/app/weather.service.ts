import { ForecastWeather } from './forecast-weather';
import { CurrentWeather } from './current-weather';
import { environment } from './../environments/environment.prod';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getWeatherByCity(city: string): Observable<CurrentWeather> {
    const options = new HttpParams()
      .set('units', 'metric')
      .set('q', city)
      .set('appId', environment.apiKey);
    
    return this.http.get<CurrentWeather>(environment.apiUrl + 'weather', {params: options});
  }

  getWeatherByLocation(lat: string, lon: string): Observable<CurrentWeather> {
    const options = new HttpParams()
      .set('units', 'metric')
      .set('lat', lat)
      .set('lon', lon)
      .set('appId', environment.apiKey);

    return this.http.get<CurrentWeather>(environment.apiUrl + 'weather', {params: options});
  }

  getWeatherIcon(id: number): string {
    let icon: string;
    switch (id) {
      //Clear
      case 800:
        icon = '../assets/weather/sunny.svg';
        break;
  
      //Cloud
      case 801:
      case 802:
        icon = '../assets/weather/partly-cloudy.svg';
        break;
      case 803:
      case 804:
        icon = '../assets/weather/cloudy.svg';
        break;
  
      //Rain
      case 500:
      case 501:
      case 520:
      case 521:
      case 511:
        icon = '../assets/weather/rain.svg';
        break;
      case 502:
      case 503:
      case 504:
      case 522:
      case 531:
        icon = '../assets/weather/heavy-rain.svg';
        break;
  
      //Drizzle
      case 300:
      case 301:
      case 302:
      case 310:
      case 311:
      case 312:
      case 313:
      case 314:
      case 321:
        icon = '../assets/weather/rain.svg';
        break;
  
      //Thunderstorm
      case 200:
      case 201:
      case 202:
      case 210:
      case 211:
      case 212:
      case 221:
      case 230:
      case 231:
      case 232:
        icon = '../assets/weather/thunderstorm.svg';
        break;
  
      //Snow
      case 600:
      case 601:
      case 602:
      case 612:
      case 613:
      case 615:
      case 616:
      case 620:
      case 621:
      case 622:
        icon = '../assets/weather/snow.svg';
        break;
      case 611:
        icon = '../assets/weather/sleet.svg';
        break;
  
      //Atmosphere
      case 701:
      case 711:
      case 721:
      case 731:
      case 741:
      case 751:
      case 761:
      case 762:
      case 771:
      case 781:
        icon = '../assets/weather/haze.svg';
        break;
  
      default:
        icon = '../assets/weather/sunny.svg';
    }
    return icon;
  }

  getForecast(lat: string, lon:string): Observable<ForecastWeather> {
    const options = new HttpParams()
      .set('units', 'metric')
      .set('lat', lat)
      .set('lon', lon)
      .set('exclude', 'current,hourly,minutely,alerts')
      .set('appId', environment.apiKey);

    return this.http.get<ForecastWeather>(environment.apiUrl + 'onecall', {params: options});
  }

}
