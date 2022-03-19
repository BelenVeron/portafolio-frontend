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


  @ViewChild('imageInputFile', { static: false }) imageFile!: ElementRef;
  image!: File;
  imageMin!: File;

  source: string = ''

  personalInformation!: PersonalInformation | null;
  imageDB!: Image;
  // if is admin
  isAdmin = false;
  // if no data
  noData = false;
  // if do not want to show edit buttons
  @Input() noButton = false;
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
    this.isAdmin = this.tokenService.isAdmin();
  }

  ngAfterViewInit(): void {
    this.getpersonalInformations();
  }

  async uploadImage(): Promise<void> {
    this.imageUploadService.uploadRemoteUrl(this.source).subscribe(
      data => {
        this.toastr.success('personalInformation update', 'OK', {
          timeOut: 3000
        });
        this.imageDB;
      },
      err => {
        console.log('error', err);
        this.toastr.error(err.error.message, 'Fail', {
          timeOut: 3000
        });
      }
    );
  }

  addPersonalInformation() {
    let data = new PersonalInformation(
      null,
      'Titulo o especialidad',
      'Nombre y apellido',
      'Resumen, descripcion o cualquier cosa que quieras escribir acerca tuyo como edad, años programando, expectativas, etc; y de tu formacion, lenguajes de programacion que manejas,etc.',
      null
    )

    this.personalInformationService.create(data).subscribe(
      data => {
        this.toastr.success('personalInformation update', 'OK', {
          timeOut: 3000
        });
        this.setData(data);
      },
      err => {
        console.log('error', err);
        this.toastr.error(err.error.message, 'Fail', {
          timeOut: 3000
        });
      }
    )
  }

  // set modalSetting with personalInformation, to send to modal
  // and make the element that is need
  setModalSetting(): void {
    if (this.personalInformation != null) {
      this.modalSetting = [];
      this.modalSetting.push({label: 'Imagen', image: true, type: 'round', value: this.personalInformation.image });
      this.modalSetting.push({label: 'Titulo', input: true, type: 'text', value: this.personalInformation.name });
      this.modalSetting.push({label: 'Nombre y apellido', input: true, type: 'text', value: this.personalInformation.degree });
      this.modalSetting.push({label: 'Descripción', textarea: true, value: this.personalInformation.summary });
    }
  }

  // if confirm the change in the modal, set the personalInformation
  // based in the change in modalSetting 
  setPersonalInformation(): void {
    if (this.personalInformation != null) {
      this.personalInformation.image = this.modalSetting[0].value;
      this.personalInformation.name = this.modalSetting[1].value;
      this.personalInformation.degree = this.modalSetting[2].value;
      this.personalInformation.summary = this.modalSetting[3].value;
    }
  }

  openUpdateModal(): void {
    this.activeModal = 'active'
  }

  // get image url in the database
  getImageDB(id: any): void {
    this.imageUploadService.get(id).subscribe(
      data => {
        this.imageDB = data;
      },
      err => {
        console.log(err);
        if (err.status === 400) {
          this.setNoData(true);
        }
      }
    );
  }

  setData(data: PersonalInformation): void {
    this.personalInformation = data;
    this.setSource(this.personalInformation);
    if (this.personalInformation !== null && this.personalInformation.image !== null) {
      this.getImageDB(this.personalInformation.image.id);
    }
    this.setModalSetting();
  }

  getpersonalInformations(): void {
    this.spinner.show()
    this.personalInformationService.get().subscribe(
      data => {
        this.setData(data);
        this.spinner.hide()
      },
      err => {
        if (err.status === 400) {
          this.setNoData(true);
          this.setSource(null);
          this.spinner.hide()
        }
      }
    )
  }

  // When there is no information
  setNoData(value: boolean): void {
    this.noData = value;
  }


  setSource(data: any) {
    if (data === null || data.image == null) {
      this.source = 'https://res.cloudinary.com/angular-portafolio/image/upload/v1643579684/default/profile.png'
    } else {
      this.source = data.image.imageUrl;
    }
  }



  onUpdate(): void {
    this.setPersonalInformation();
    console.log(this.modalSetting[1].value)
    if (this.personalInformation != null) {
      this.personalInformationService.save(this.personalInformation).subscribe(
        data => {
          // set source to the image
          this.setSource(this.personalInformation);
          this.toastr.success('personalInformation update', 'OK', {
            timeOut: 3000
          });
        },
        err => {
          console.log('error', err);
          this.toastr.error(err.error.message, 'Fail', {
            timeOut: 3000
          });
        }
      ) 
    } 
    // close the modal, and set the active property
    this.activeModal = ''
  }

  cancel(): void {
    this.activeModal = ''
  }


  delete() {
    if (this.personalInformation != null) {
      this.personalInformationService.delete(this.personalInformation).subscribe(
        data => {
          this.toastr.success('personalInformation delete', 'OK', {
            timeOut: 3000
          });
        },
        err => {
          this.toastr.error(err.error.message, 'Fail', {
            timeOut: 3000
          });
        }
      )
    }
    this.personalInformation = null;
  }
}
