import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appResponsive]'
})
export class ResponsiveDirective {

  constructor(private el: ElementRef) {}

  @Input() defaultColor = '';

  @Input() appHighlight = '';

  @Input() responsiveSize = '';

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.appHighlight || this.defaultColor || 'red');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('');
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: { target: { innerWidth: Number } }) {
    if (event.target.innerWidth < 900) this.responsiveSize = 'pad';
    else if (event.target.innerWidth < 400) this.responsiveSize = 'phone';
    else this.responsiveSize = '';
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }

  /* <p [appHighlight]="color" defaultColor="violet">
    Highlight me too!
  </p> */
}
