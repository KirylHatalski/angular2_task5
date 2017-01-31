import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IndexComponent }  from '../components/index.component';
import { WeatherComponent } from '../components/weather.component';
import { GooglemapsComponent } from '../components/googlemaps.component';
import { PositiopCheckerComponent } from "../components/position_check.component";
import { TableComponent } from '../components/table.component';
import { TableRowComponent } from "../components/tablerow.component";
import { TemperaturePipe } from '../pipes/temperature.pipe';
import { OrderByPipe } from '../pipes/order_by.pipe';
import { WindDirective } from '../directives/wind.directive';
import { HotnessDirective } from '../directives/hotness.directive';
import { IconDirective } from '../directives/icon.directive';



@NgModule({
    imports: [BrowserModule],
    declarations: [
      IndexComponent,
      WeatherComponent,
      GooglemapsComponent,
      TableComponent,
      TemperaturePipe,
      WindDirective,
      PositiopCheckerComponent,
      TableRowComponent,
      OrderByPipe,
      IconDirective,
      HotnessDirective
    ],
    bootstrap: [IndexComponent]
})
export class IndexModule { }
