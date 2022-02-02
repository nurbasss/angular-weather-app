import { ForecastItem } from './../../forecast-weather';
import { Component, Input, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/weather.service';

@Component({
  selector: 'app-forecast-item',
  templateUrl: './forecast-item.component.html',
  styleUrls: ['./forecast-item.component.scss']
})
export class ForecastItemComponent implements OnInit {
  @Input() forecastItem!: ForecastItem;

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.forecastItem.weather[0].icon = this.weatherService.getWeatherIcon(this.forecastItem.weather[0].id)
  }

}
