import '../interfaces/weather.interface'
import '../interfaces/position.interface'

import { Component } from '@angular/core';
import { WeatherService } from '../services/weather.service'
import { PositionService } from '../services/position.service'
import { DataStorageService } from '../services/data_storage.service'

@Component({
    selector: 'weather',
    providers: [WeatherService, PositionService, DataStorageService],
    template: ``
})

export class WeatherComponent {

    constructor(
      public tweatherService: WeatherService,
      public tpositionService: PositionService,
      public tdataStorageService: DataStorageService
    ) {
        this.tpositionService.getPosition().then((coords: ICoordinates) => { this.initWeather(coords.latitude, coords.longitude) });
    }

    initWeather(lat: number, lon: number) {
        let tempWeather: IWeather = this.tdataStorageService.getFromLocStor('weather');
        if (tempWeather) {
            if (Date.now() - tempWeather.createTime > 10 * 60 * 1000) {
                this.tweatherService.getWeather(lat, lon).then((data: IWeather) => {
                  this.tdataStorageService.saveToLocStor('weather', data)
                })
            }
        } else {
            this.tweatherService.getWeather(lat, lon).then((data: IWeather) => {
                this.tdataStorageService.saveToLocStor('weather', data)
            })
        }
    }
}
