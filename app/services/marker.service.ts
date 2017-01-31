import {Injectable} from '@angular/core';
import '../interfaces/marker.interface';

@Injectable()
export class MarkerService {

    createMarkers(list: Array<IDataListItem>, map: google.maps.Map) {

        list.forEach((variable: IDataListItem) => {
            new google.maps.Marker({
                position: { lat: +variable.coord.lat, lng: +variable.coord.lon },
                map: map,
                icon: {
                    url: `http://openweathermap.org/img/w/${variable.weather[0].icon}.png`,
                    size: new google.maps.Size(50, 100)
                },
                label: {
                    text: `${variable.name} ${Math.round(variable.main.temp - 273.15)} °C`,
                    color: "rgb(254, 171, 46)",
                    fontSize: '18px'
                },
                title: variable.name
            });
        });
    }
}
