export const template: string = `
<div class='power'>${this.power} M/s</div>
<div style='transform: rotate(${-90 + this.direction}deg)'>
  <div class="direction"></div>
</div>`
