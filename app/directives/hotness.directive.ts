import '../interfaces/weather.interface';

import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({ selector: '[hotness]' })
export class HotnessDirective implements OnInit {
  constructor( private el:ElementRef ) { }


  ngOnInit(){
    // this.el.nativeElement.style.color = `rgb(${Math.round(this.temperature/255)}, 0, ${Math.round(this.temperature/255)})`;
    // this.el.nativeElement.style.filter = `hue-rotate(${this.temperature}deg)`;
  }
  @Input() temperature: number;
}
