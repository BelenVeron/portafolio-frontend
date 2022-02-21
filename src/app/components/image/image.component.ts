import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  @Input() type: string = "";
  @Input() height: number = 50;
  @Input() size: number = 3;
  @Input() textLogo: string = "";
  @Input() link: string = "";
  source: string = "";

  constructor() { }

  ngOnInit(): void {
    this.addType();
  }

  addType(): void {
    this.source = `/assets/images/${this.type}.png`;
  }

  externalRedirect(): void {
    if (this.type === 'logo') {
      window.open("https://www.argentina.gob.ar/produccion/transformacion-digital-y-economia-del-conocimiento/argentina-programa", "_blank")
    } else {
      window.open(this.link, "_blank")
    }
  }

}
