import { CurrentWeather } from './../current-weather';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss']
})
export class CurrentWeatherComponent implements OnInit {
  @Input() weather!: CurrentWeather;

  constructor() { }

  ngOnInit(): void {
  }

}
