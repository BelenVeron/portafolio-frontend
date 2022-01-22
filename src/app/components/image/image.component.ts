import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  @Input() type: string = "";
  @Input() height: number = 50;
  @Input() textLogo: string = "";

  constructor() { }

  ngOnInit(): void {
    this.addType();
  }

  addType(): void {
    switch (this.type) {
      case "logo":
        this.type="/assets/images/APLogo.png";
        break;
      case "facebook":
        this.type="/assets/images/facebook.png";
        break;
      case "youtube":
        this.type="/assets/images/youtube.png";
        break;
      case "twitter":
        this.type="/assets/images/APtwitter.png";
        break;
      case "linkedin":
        this.type="/assets/images/APlinkedin.png";
        break;
      case "instagram":
        this.type="/assets/images/APinstagram.png";
        break;
      default:
        break;
    }
    
  }

}
