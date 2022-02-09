import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  @Input() typeNum: boolean = false;
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() classInput: string = 'form-input';
  @Input() type: string = '';
  @Input() value: string = '';
  @Input() placeholder: string = '';
  @Input() width: number = 250;
  @Input() maxlenght: string = '100';
  @Output() newValueEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    if (this.value.length === 0) {
      this.width = 250;
    } else {
      this.width = this.value.length*12;
    }
  }

  addValue(value: string){
    if (this.typeNum){
      this.width = value.length*12+10; 
      value = value.replace(/[^0-9\.]+/g, '')
      if (isNaN(parseInt(value))){
        value = '0'
      } else {
        value = value.replace(/^0+(\d)/, '$1')
      }
    }
    if(parseInt(value) > 100){
      value = '100'
    }
    this.value = value
    this.newValueEvent.emit(value);
  }

}
