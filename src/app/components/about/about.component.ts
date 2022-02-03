import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PersonalInformation } from 'src/app/models/crud/personal-information';
import { TokenService } from 'src/app/services/auth/token.service';
import { ImageUploadService } from 'src/app/services/image-upload/image-upload.service';
import { PersonalInformationService } from 'src/app/services/personal-information/personal-information.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {


  @ViewChild('imageInputFile', {static: false}) imageFile!: ElementRef;
  image!:  File;
  imageMin!:  File;
  
  source: string = ''

  personalInformation!: PersonalInformation;
  isAdmin = false;

  constructor(
    private personalInformationService: PersonalInformationService,
    private toastr: ToastrService,
    private tokenService: TokenService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private imageUploadService: ImageUploadService
    ) {
      
    }

    onUpload(event: any): void {
      this.spinner.show();
      this.image = event.target.files[0];
      console.log(this.image)
      this.imageUploadService.upload(this.image, "personalInformation").subscribe(
        data => {
          this.spinner.hide();
          this.getpersonalInformations();
        },
        err => {
          alert(err.error.mensaje);
          this.spinner.hide();
        }
      ); 
    }

  ngOnInit(): void {
    this.getpersonalInformations();
    this.isAdmin = this.tokenService.isAdmin();
  }

  addName(value: string) {
    this.personalInformation.name = value;
  }

  getpersonalInformations(): void {
    this.personalInformationService.get().subscribe(
      data => {
        this.personalInformation = data;
        this.setSource(this.personalInformation);
      },
      err => {
        console.log(err);
      }
    )
  }

  
  setSource(data: PersonalInformation){
    if (data.image == null) {
      this.source = 'https://res.cloudinary.com/angular-portafolio/image/upload/v1643579684/default/profile.png'
    } else {
      this.source = data.image.imageUrl;
    }
  }
  
  onUpdate(): void {
    this.personalInformationService.update(this.personalInformation).subscribe(
      data => {
        this.toastr.success('personalInformation update', 'OK', {
          timeOut: 3000
        });
      },
      err => {
        console.log('error',err);
        /* this.toastr.error(err.error.message, 'Fail', {
          timeOut: 3000
        }); */
      }
    )
  }

  delete(id: number, personalInformation: PersonalInformation) {
    this.personalInformationService.delete(id, personalInformation).subscribe(
      data => {
        this.toastr.success('personalInformation delete', 'OK', {
          timeOut: 3000
        });
        this.getpersonalInformations();
      },
      err => {
        this.toastr.error(err.error.message, 'Fail', {
          timeOut: 3000
        });
      }
    )
  }


}
