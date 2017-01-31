import '../interfaces/weather.interface';

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'orderBy' })

export class OrderByPipe implements PipeTransform {
    transform(value: Array<IDataListItem>, key: string) {
          return value.sort((a:IDataListItem, b:IDataListItem) => {
            if(a[key] > b[key]) return -1;
            if(a[key] < b[key]) return 1;
            return 0;
          });
    }
}
