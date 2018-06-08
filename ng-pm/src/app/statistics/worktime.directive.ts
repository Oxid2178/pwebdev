import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[bbvWorkTime]'
})
export class WorktimeDirective implements OnInit {
  private el: ElementRef;

  @Input('bbvWorkTime') bbvWorkTime;

  constructor(el: ElementRef) {
    this.el = el;
  }

  ngOnInit() {
    if (this.bbvWorkTime < 420) {
      this.el.nativeElement.style.backgroundColor = 'yellow';
    } else if (this.bbvWorkTime >= 420 && this.bbvWorkTime < 540) {
      this.el.nativeElement.style.backgroundColor = 'green';
    } else {
      this.el.nativeElement.style.backgroundColor = 'red';
    }
  }
}
