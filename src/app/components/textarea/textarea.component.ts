import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.css']
})
export class TextareaComponent implements OnInit {

  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() classTextarea: string = 'form-textarea';
  @Input() text: string = '';
  @Input() value: string = '';
  @Input() rows: number = 4;
  @Input() cols: number = 80;
  @Output() newValueEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    this.text = this.value;
    if (this.value) {
      if (this.value.length > 200) {
        this.rows = this.value.length/60;
        this.cols = this.value.length/10;
      }
    }
  }

  addValue(value: string){
    this.newValueEvent.emit(value);
  }


}
