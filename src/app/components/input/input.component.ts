import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  @Input() required: boolean = false;
  @Input() type: string = '';
  value: string = '';
  @Output() newValueEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  addValue(value: string){
    this.newValueEvent.emit(value);
  }

}
