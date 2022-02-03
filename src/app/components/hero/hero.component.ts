import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  @Input() heroUrl: string = 'hero.png'
  @Input() animation: string = 'overlay';
  activeAnimation: boolean = true;
  interval?: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.setAnimation()
    setInterval(()=>{this.setAnimation()}, 5000) 
  }

  setAnimation(): void {
    if(this.activeAnimation) {
      this.animation = 'overlay';
      this.activeAnimation = false;
    }else {
      this.animation = '';
      this.activeAnimation = true;
    }
  }

}
