import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  @Input() text:string = 'button'
  @Input() height:string = '40'
  @Input() width:string = '80'
  @Input() disabled:boolean = false

  constructor() { }

  ngOnInit(): void {
  }

}
