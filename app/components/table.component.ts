import '../interfaces/table.interface';
import { Component, ChangeDetectorRef, OnInit, ChangeDetectionStrategy, OnDestroy, OnChanges} from '@angular/core';
import { DataStorageService } from '../services/data_storage.service';
import { OrderByPipe } from '../pipes/order_by.pipe';
import { template } from '../templates/table.template';
import { Subscription }   from 'rxjs/Subscription';


@Component({
    selector: 'table-component',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DataStorageService],
    template: template
})

export class TableComponent implements OnInit, OnChanges, OnDestroy {
    weather: IWeather;
    date: Date;
    format: string;
    tableVisibility: boolean;
    interval: number;
    curentCity: IDataListItem;
    subscription: Subscription;

    constructor(
        private tDataStorageService: DataStorageService,
        private cd: ChangeDetectorRef
    ) {
      this.subscription = tDataStorageService.location$.subscribe(value => {
        console.log(value);
      });

    }

    ngOnInit() {
        if (localStorage.getItem('weather')) {
            this.weather = this.tDataStorageService.getFromLocStor('weather');
            this.weather.list.forEach(variable => {
                if (!variable.favor) variable['favor'] = false;
            });
            this.date = new Date(this.weather.createTime);
            this.tableVisibility = false;
            this.curentCity = this.weather.list[0];
            this.format = 'celsia';
        } else {
            setTimeout(this.ngOnInit(), 2000)
        }
        this.interval = setInterval(() => {
            this.cd.detectChanges()
        }, 5000);
    }

    ngOnChanges() {
        this.weather.list = new OrderByPipe().transform(this.weather.list, 'favor');
    }

    ngOnDestroy() {
        clearInterval(this.interval);
    }

    tryToChange(event: IDataListItem) {
        this.weather.list.forEach((value: IDataListItem) => {
            if (value.id === event.id) { return }
            value.favor = false;
        })
        this.tDataStorageService.saveToLocStor('weather', this.weather);
        this.weather = this.tDataStorageService.getFromLocStor('weather');
    }

    tableToggle(): void {
        this.tableVisibility = !this.tableVisibility;
    }

    checkFormat(newValue: string): void {
        this.format = newValue;
    }
}
