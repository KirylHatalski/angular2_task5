import {Injectable} from '@angular/core';
import '../interfaces/position.interface';

@Injectable()
export class PositionService {

    getPosition(): Promise<Object> {
        let coords: ICoordinates;

        function getRandom(range: number) {
            return (Math.random() * range) - (range / 2);
        }

        return new Promise((resolve: Function, reject: Function) => {
            navigator.geolocation.getCurrentPosition(
                (position: IPositionNavigator) => {
                    coords = position.coords;
                    resolve(coords);
                },
                () => {
                    console.log('Something going wrong');
                    coords.latitude = getRandom(180);
                    coords.longitude = getRandom(360);

                    resolve(coords);
                });
        });
    };

    getViewPortCoordinates(map: google.maps.Map): Promise<Object> {
      return new Promise((resolve: Function, reject: Function) => {
        let lng: number,
            lat: number;

            lat = map.getCenter().lat();
            lng = map.getCenter().lng();

        if(map){
          resolve({lat: lat, lng: lng})
        }
      });
    };

    getNearestCityName(lat: number, lng: number): Promise<Object> {
      return new Promise((resolve: Function, reject: Function) => {
        let xhr = new XMLHttpRequest(),
            cityName: Object;

        xhr.open('GET', `http://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&sensor=false`, true);
        xhr.send();
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                cityName = JSON.parse(xhr.responseText);
                resolve(cityName);
            }
        }
      });
    }
}
