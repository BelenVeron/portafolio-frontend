import { Component, OnInit, ViewChild, ElementRef, Input, Output } from '@angular/core';
import { ImageUploadService } from '../../services/image-upload/image-upload.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {

  @ViewChild('imageInputFile', {static: false}) imageFile!: ElementRef;

  image!:  File;
  imageMin!:  File;
  @Input() source: String = '';


  constructor(
    private imageUploadService: ImageUploadService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
  }

  onFileChange(event: any) {
    this.image = event.target.files[0];
    const fr = new FileReader();
    fr.onload = (evento: any) => {
      this.imageMin = evento.target.result;
    };
    fr.readAsDataURL(this.image);
  }

  /* onUpload(): void {
    this.spinner.show();
    this.imageUploadService.upload(this.image).subscribe(
      data => {
        this.spinner.hide();
        this.router.navigate(['/edit']);
      },
      err => {
        alert(err.error.mensaje);
        this.spinner.hide();
        this.reset();
      }
    );
  } */

  reset(): void {
    /* this.image  = null;
    this.imageMin  = null; */
    this.imageFile.nativeElement.value = '';
  }

}