import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'temperature' })

export class TemperaturePipe implements PipeTransform {
  transform( value: number, format: string ) : string {
    switch (format) {
      case 'celsia':
        return `${Math.round(value - 273.15)} °C`;
      case 'farengate':
        return `${Math.round(1.8 * (value - 273.15) + 32)} °F`;
      default:
        return `${Math.round(value)} °K`;
    }
  }
}
