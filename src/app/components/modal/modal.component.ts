import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Image } from 'src/app/models/crud/image';
import { ImageDto } from 'src/app/models/crud/image-dto';
import { ImageUploadService } from 'src/app/services/image-upload/image-upload.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() active: string = '';
  @Input() title: string = 'Titulo'
  @Input() settings: any[] = []
  @Output() settingsChange = new EventEmitter<any[]>();
  @Input() source: string = ''
  image: any;
  imageNew!: ImageDto;

  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private imageUploadService: ImageUploadService,
    ) { }

  ngOnInit(): void {
  }

  
  setSource(data: any){
    if (data.imageUrl == null) {
      this.source = 'https://res.cloudinary.com/angular-portafolio/image/upload/v1643579684/default/profile.png'
    } else {
      this.source = data.imageUrl;
    }
  }

  onUpload(event: any): void {
    this.spinner.show();
      this.image = event.target.files[0];
      this.imageUploadService.uploadHost(this.image).subscribe(
        data => {
          this.spinner.hide();
          this.setSource(data)
          this.imageNew = data
        },
        err => {
          alert(err.error.mensaje);
          this.spinner.hide();
        }
      ); 
  }

  setSettingsSource(data: ImageDto): void {
    this.settings.forEach(element => {
      if (element.image){
        element.value.name = data.name;
        element.value.imageUrl = data.imageUrl;
        element.value.imageId = data.imageId;
      }
    });
  }

  addValue(event: any, value: any): void {
    this.settings.forEach(element => {
      if (element.value === value){
        element.value = event
      }
    });
  }

  openModal(): void {
    this.active = 'active'
  }

  closeModal(): void {
    this.active = ''
    location.reload();
  }

  // emit an event with the settings changed and close modal
  confirm(): void {
    this.setSettingsSource(this.imageNew);
    this.settingsChange.emit(this.settings)
    this.closeModal();
  }

}
