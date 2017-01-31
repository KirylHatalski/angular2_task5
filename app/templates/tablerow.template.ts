export const template: string = `
  <td hotness [temperature]='weather.main.temp'>{{weather.name}}</td>
  <td><img src="http://openweathermap.org/img/w/{{weather.weather[0].icon}}.png" alt=""></td>
  <td *ngIf='weather.main.temp_min !== weather.main.temp_max'>{{weather.main.temp_min | temperature: format}} - {{weather.main.temp_max | temperature: format}}</td>
  <td *ngIf='weather.main.temp_min === weather.main.temp_max'>{{weather.main.temp | temperature: format}}</td>
  <td>{{weather.weather[0].description}}</td>
  <td>{{weather.clouds.all}}%</td>
  <td>{{weather.main.pressure | number: "1.0-0"}}</td>
  <td>{{weather.main.humidity}}</td>
  <td class='compass'>
      <div class="nord">N</div>
      <div class='power'><strong>{{weather.wind.speed | number: "1.0-0"}}</strong>M/s</div>
      <div wind [direction]='weather.wind.deg' class='direction'>
        &#10142;
      </div>
  </td>
  <td [class.unfav]="!weather.favor" class='favorite'><i (click)='weather.favor = !weather.favor; setFavorite()'>&#9733;</i></td>
  <td class='clickable' (click)='setDelete()'>-</td>
`
