import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Image } from 'src/app/models/crud/image';
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
  imageDB!: Image;
  // if is admin
  isAdmin = false;
  // if no data
  noData = false;
  @Input() activeModal: string = '';
  modalSetting: any[] = []

  constructor(
    private personalInformationService: PersonalInformationService,
    private toastr: ToastrService,
    private tokenService: TokenService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private imageUploadService: ImageUploadService,
    ) {
      
    }


  ngOnInit(): void {
    this.getpersonalInformations();
    this.isAdmin = this.tokenService.isAdmin();
  }

  // set modalSetting with personalInformation, to send to modal
  // and make the element that is need
  setModalSetting(): void {
    this.modalSetting.push({image: true, value: this.personalInformation.image});
    this.modalSetting.push({input: true, value: this.personalInformation.name});
    this.modalSetting.push({input: true, value: this.personalInformation.degree});
    this.modalSetting.push({textarea: true, value: this.personalInformation.summary});
  }

  // if confirm the change in the modal, set the personalInformation
  // based in the change in modalSetting 
  setPersonalInformation(): void {
    this.personalInformation.image = this.modalSetting[0].value;
    this.personalInformation.name = this.modalSetting[1].value;
    this.personalInformation.degree = this.modalSetting[2].value;
    this.personalInformation.summary = this.modalSetting[3].value;
  }

  addName(value: string) {
    this.personalInformation.name = value;
  }

  openUpdateModal(): void{
    this.activeModal = 'active'
  }

  // get image url in the database
  getImageDB(id: any): void{
    this.imageUploadService.get(id).subscribe(
      data => {
        this.imageDB = data;
        console.log('imagen',this.imageDB)  
      },
      err => {
        console.log(err);
        if (err.status === 400){
          this.setNoData(true);
        }
      }
    );
  }

  getpersonalInformations(): void {
    this.personalInformationService.get().subscribe(
      data => {
        this.personalInformation = data;
        this.setSource(this.personalInformation);
        this.getImageDB(this.personalInformation.image.id);
        console.log('imagen1',this.imageDB)
        this.setModalSetting();
      },
      err => {
        console.log(err);
        if (err.status === 400){
          this.setNoData(true);
        }
      }
    )
  }

  // When there is no information
  setNoData(value: boolean): void{
    this.noData = value;
  }

  
  setSource(data: PersonalInformation){
    if (data.image == null) {
      this.source = 'https://res.cloudinary.com/angular-portafolio/image/upload/v1643579684/default/profile.png'
    } else {
      this.source = data.image.imageUrl;
    }
  }
  
  onUpdate(): void {
    this.setPersonalInformation();
    this.personalInformationService.save(this.personalInformation).subscribe(
      data => {
        this.toastr.success('personalInformation update', 'OK', {
          timeOut: 3000
        });
      },
      err => {
        console.log('error',err);
        this.toastr.error(err.error.message, 'Fail', {
          timeOut: 3000
        }); 
      }
    )
    location.reload();
  }

  delete() {
    this.personalInformationService.delete(this.personalInformation).subscribe(
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
