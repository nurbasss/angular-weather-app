import { ForecastWeather, ForecastItem } from './../forecast-weather';
import { WeatherService } from './../weather.service';
import { CurrentWeather } from './../current-weather';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  myControl = new FormControl();
  options: string[] = ['Almaty', 'Astana','London', 'Beijing', 'New York', 'Istanbul', 'Moscow'];
  filteredOptions!: Observable<string[]>;
  currentWeather: CurrentWeather | undefined;  
  forecastList: ForecastItem[] = [];
  location: any;

  constructor(private weatherService: WeatherService) {
   }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  search(city: string) {
    this.forecastList =[];

    this.weatherService.getWeatherByCity(city).subscribe(weather => {
      this.currentWeather = weather;
      this.currentWeather.weather[0].icon = 
        this.weatherService.getWeatherIcon(weather.weather[0].id);
      
      this.weatherService.getForecast(
        weather.coord.lat.toString(), 
        weather.coord.lon.toString()
        ).subscribe(forecast => {
          for(let i=1; i<forecast.daily.length; i++){
            this.forecastList?.push(forecast.daily[i]);
          }
        });
    });
  }

  searchGeo() {
    this.forecastList =[];

    navigator.geolocation.getCurrentPosition((pos)=>{
      this.location = pos.coords;
      this.weatherService.getWeatherByLocation(
        this.location.latitude.toString(), 
        this.location.longitude.toString()
      ).subscribe(weather => {
        this.currentWeather = weather;
        this.currentWeather.weather[0].icon = 
          this.weatherService.getWeatherIcon(weather.weather[0].id);
          
        this.weatherService.getForecast(
          weather.coord.lat.toString(), 
          weather.coord.lon.toString()
        ).subscribe(forecast => {
            for(let i=1; i<forecast.daily.length; i++){
            this.forecastList?.push(forecast.daily[i]);
          }
        });
      });
    });
  }

}
