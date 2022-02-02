import { ForecastItem } from './../forecast-weather';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnInit {
  @Input() forecastList: ForecastItem[] | undefined;

  constructor() { }

  ngOnInit(): void {
    
  }

}
