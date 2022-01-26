import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  source: string = '/assets/images/profile.png'
  name: string = 'Name';
  degree: string = 'Degree';
  summary: string = 'Aute velit aute deserunt enim anim aliqua laborum ex nisi consequat. Nisi deserunt laboris ad irure sint duis culpa aliquip. Veniam aliqua qui nostrud aliqua Lorem proident quis. Nulla est officia ex voluptate consequat adipisicing esse consequat voluptate ut aliqua ex aliquip.'

  constructor() { }

  ngOnInit(): void {
  }

}
