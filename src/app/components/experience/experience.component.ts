import { Component, OnInit } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from "@angular/core";

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<string>();
  
  title = 'EXPERIENCIA LABORAL';
  constructor() { }

  ngOnInit(): void {
  }

}
