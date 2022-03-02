import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Education } from 'src/app/models/crud/education';
import { Image } from 'src/app/models/crud/image';
import { TokenService } from 'src/app/services/auth/token.service';
import { EducationService } from 'src/app/services/education/education.service';
import { ImageUploadService } from 'src/app/services/image-upload/image-upload.service';
import { UtilService } from 'src/app/services/util/util.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

  title: string = 'Educación';
  isAdmin: boolean = false;
  educations: Education[] = [];
  source: string = '';
  // if no data
  noData: boolean = false;
  // if do not want to show edit buttons
  @Input() noButton = false;
  today: Date = new Date(Date.now());
  @Input() activeModal: string = '';
  modalSetting: any[] = []
  image!: Image;
  imageDB!: Image;

  constructor(
    private toastr: ToastrService,
    private tokenService: TokenService,
    private educationService: EducationService,
    private imageUploadService: ImageUploadService,
    private util: UtilService
    ) {
      
    }
  ngOnInit(): void {
    this.isAdmin = this.tokenService.isAdmin();
    this.getCards();
  }

  // get all the work educations in the database and
  // assign to this.educations
  getCards(): void {
    this.educationService.get().subscribe(
      data => {
        this.educations = data;
        if (this.educations.length === 0) {
          this.noData = true
        }
      },
      err => {
        if (err.status === 400){
          
        }
      }
    )
  }

  // set modalSetting with Education, to send to modal
  // and make the element that is need
  setModalSetting(data: Education): void {
    if (!data.image){
      this.source = 'https://res.cloudinary.com/angular-portafolio/image/upload/v1643579687/default/hero_qsmo76.png'
    }else{
      this.source = data.image.imageUrl
    }
    this.modalSetting.push({id: data.id});
    this.modalSetting.push({label: 'Imagen', image: true, type: 'square', value: data.image});
    this.modalSetting.push({label: 'Institución', input: true, type: 'text', value: data.institution});
    this.modalSetting.push({label: 'Titulo o puesto', input: true, type: 'text',  value: data.degree});
    this.modalSetting.push({label: 'Fecha', input: true, type: 'date', value: data.date});
    this.modalSetting.push({label: 'Periodo y detalles', textarea: true, value: data.period});
    console.log(this.modalSetting)
  }

  // if confirm the change in the modal, set the educations
  // based in the change in modalSetting 
  setEducation(): Education {
    let education = new Education(
      this.modalSetting[0].id,
      this.modalSetting[2].value,
      this.modalSetting[3].value,
      this.modalSetting[4].value,
      this.modalSetting[5].value,
      this.modalSetting[1].value
    );
    this.educations.forEach(element => {
      if (element.id === education.id) {
        element.date = education.date;
        element.degree = education.degree;
        element.image = education.image;
        element.institution = education.institution;
        element.period = education.period;
      }
    });
    this.modalSetting = [];
    return education;
  }

  openUpdateModal(data: Education): void{
    this.setModalSetting(data);
    this.activeModal = 'active'
  }

  cancel(): void {
    this.activeModal = ''
    this.modalSetting = [];
  }

  setNoData(value: boolean) {
    this.noData = value;
  }

  // set the source in the image of every component in html
  setSourceImage(data: Education): string{
    if (data.image == null) {
      return 'https://res.cloudinary.com/angular-portafolio/image/upload/v1643579687/default/hero_qsmo76.png'
    } else {
      return data.image.imageUrl;
    }
  }


  addCard(): void {
    let experience: Education = new Education(
      null,
      'Nueva institucion', 
      'Titulo', 
      this.util.getToday(), 
      'Periodo y detalle',
      null
    );

    this.educationService.save(experience).subscribe(
      data => {
        this.toastr.success('Education guardado', 'OK', {
          timeOut: 3000
        });
        this.educations.push(data);
        this.noData = false;
      },
      err => {
        console.log('error',err);
         this.toastr.error(err.error.message, 'Fail', {
          timeOut: 3000
        }); 
      }
    )
  }


  onUpdate(): void {
    this.educationService.save(this.setEducation()).subscribe(
      data => {
        this.toastr.success('Education guardado', 'OK', {
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
  }
  
  delete(id: number | null): void {
    if (id != null) {
      this.educationService.delete(id).subscribe(
        data => {
          this.toastr.success('Education guardado', 'OK', {
            timeOut: 3000
          });
          this.educations = this.educations.filter(el => el.id !== id);
        },
        err => {
          console.log('error',err);
          this.toastr.error(err.error.message, 'Fail', {
            timeOut: 3000
          }); 
        }
      ) 
    }
  }

}
