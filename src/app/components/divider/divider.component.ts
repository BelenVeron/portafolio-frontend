import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-divider',
  templateUrl: './divider.component.html',
  styleUrls: ['./divider.component.css']
})
export class DividerComponent implements OnInit {

  @Input() divider: string = 'astro'

  constructor() { }

  ngOnInit(): void {
  }

}
