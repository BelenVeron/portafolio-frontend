import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appResponsive]'
})
export class ResponsiveDirective {

  constructor(private el: ElementRef) {}

  @Input() defaultColor = '';

  @Input() appHighlight = '';

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.appHighlight || this.defaultColor || 'red');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('');
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: { target: { innerWidth: Number } }) {
    console.log('Width: ' + event.target.innerWidth);
    if (event.target.innerWidth < 400) this.highlight('red');
    else this.highlight('yellow');
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }

  /* <p [appHighlight]="color" defaultColor="violet">
    Highlight me too!
  </p> */
}
