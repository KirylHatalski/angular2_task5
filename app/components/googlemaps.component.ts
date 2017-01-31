import '../interfaces/position.interface';
import '../interfaces/weather.interface';

import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { PositionService } from '../services/position.service';
import { PositionCheckService } from '../services/position_check.service';
import { MarkerService } from '../services/marker.service';
import { DataStorageService } from '../services/data_storage.service';

@Component({
    selector: 'googlemaps',
    providers: [PositionService, MarkerService, PositionCheckService, DataStorageService],
    template: `<div class='map'></div>`
})

export class GooglemapsComponent implements OnInit, OnChanges {
    coord_temp: ICoordinates;
    count: number;
    map: google.maps.Map;

    constructor(
        public tMarkerService: MarkerService,
        public tPositionService: PositionService,
        public tDataStorageService: DataStorageService,
        public tPositionCheckService: PositionCheckService) { }

    ngOnInit() {
        this.tPositionService.getPosition().then((data: ICoordinates) => {
            this.initMap(data)
        });
    }

    ngOnChanges() {

    }


    initMap(coords: ICoordinates) {
        let elem = document.createElement('script'),
            markers: IWeather;

        this.count = 0;


        elem.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA2BbPGgt4MP4YD12z5AftgBgGS9vitNJE&callback=googleResponse`;
        document.body.appendChild(elem);

        (<IWindow>window).googleResponse = () => {
            markers = JSON.parse(localStorage.getItem('weather'));

            this.map = new google.maps.Map(document.querySelector('.map'), {
                center: { lat: coords.latitude, lng: coords.longitude },
                zoom: 10,
                mapTypeId: google.maps.MapTypeId.SATELLITE
            });

            this.getStartLocation(this.map, coords);
            this.tDataStorageService.setMap(this.map);

            google.maps.event.addListener(this.map, 'bounds_changed', () => {
                this.coord_temp = coords;
                if (this.count > 30) {
                    this.count = 0;
                    this.tPositionCheckService.getCurrentLocationData(this.map, this.coord_temp).then((value: IPositionCheck) => {
                        if (value.status == 'OK') {
                            this.coord_temp = {
                                latitude: value.results[0].geometry.location.lat,
                                longitude: value.results[0].geometry.location.lng
                            }
                            this.tDataStorageService.setLocation(value.results[0]);
                        }
                    });
                } else {
                    this.count += 1;
                }
            })

            if (localStorage.getItem('weather')) {
                this.tMarkerService.createMarkers(markers.list, this.map);
            } else {
                setTimeout((<IWindow>window).googleResponse, 2000);
            }
        }
    }

    getStartLocation(map: google.maps.Map, coords: ICoordinates) {
        this.tPositionCheckService.getCurrentLocationData(map, null).then((value: IPositionCheck) => {
            if (value.status == 'OK') {
                this.coord_temp = {
                    latitude: value.results[0].geometry.location.lat,
                    longitude: value.results[0].geometry.location.lng
                }
                this.tDataStorageService.setLocation(value.results[0]);
            }
        });
    }
}
