import '../interfaces/position.interface';

import { Injectable } from '@angular/core';
import { PositionService } from './position.service';


@Injectable()
export class PositionCheckService {
    constructor(
        public tpositionService: PositionService
    ) {}

    mathFocus(num: number, accuracy: number): number {
        return Math.round(num * accuracy);
    }

    getCurrentLocationData(map: google.maps.Map, oldCoords: ICoordinates): Promise<Object> {
        return new Promise((resolve: Function, reject: Function) => {
            this.tpositionService.getViewPortCoordinates(map).then((value: ICoord) => {
                if (oldCoords) {
                    if (this.mathFocus(oldCoords.latitude, 30) !== this.mathFocus(value.lat, 30) || this.mathFocus(oldCoords.longitude, 30) !== this.mathFocus(value.lng, 30)) {
                        this.tpositionService.getNearestCityName(value.lat, value.lng).then((value: IPositionCheck) => {
                            resolve(value);
                        })
                    }
                } else {
                    this.tpositionService.getNearestCityName(value.lat, value.lng).then((value: IPositionCheck) => {
                        resolve(value);
                    });
                }
            });
        });
    };
};
