import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() classInput: string = 'form-input';
  @Input() type: string = '';
  @Input() value: string = '';
  @Input() placeholder: string = '';
  @Input() width: number = 250;
  @Output() newValueEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    if (this.value.length === 0) {
      this.width = 250;
    } else {
      this.width = this.value.length*10;
    }
  }

  addValue(value: string){
    this.newValueEvent.emit(value);
  }

}
