import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import '../interfaces/weather.interface';
import '../interfaces/position.interface';

@Injectable()
export class DataStorageService {
    private location = new Subject();
    private map = new Subject();

    location$ = this.location.asObservable();
    map$ = this.map.asObservable();

    setLocation(_location: IResult) {
      if(_location) {
        this.location.next(_location);
      }
    }

    setMap(map: google.maps.Map){
      if(map) {
        this.map.next(map);
      }
    }

    //+because this services cannot know which data will come to it, they will be <any> type
    saveToLocStor(key: string, data: any){
      localStorage.setItem(key, JSON.stringify(data));
    }
    getFromLocStor(key: string): any {
      return JSON.parse(localStorage.getItem(key));
    }
    //-because this service cannot know which data will come to it
}
