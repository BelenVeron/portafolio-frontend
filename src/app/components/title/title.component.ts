import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit {

  @Input() title: string = 'Title'
  @Input() type: string = 'swoosh'
  @Input() fontSize: string = 'swoosh'
  @Input() titleType: string = 'swoosh'


  constructor() { }

  ngOnInit(): void {
  }

}
