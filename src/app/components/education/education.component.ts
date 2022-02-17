import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Education } from 'src/app/models/crud/education';
import { EducationDto } from 'src/app/models/crud/education-dto';
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
        this.setSources(this.educations);
      },
      err => {
        if (err.status === 400){
          
        }
      }
    )
  }

  setSources(data: Education[]) {
    data.forEach(element => {
      if (element.image == null) {
        this.getImage();
        element.image = this.image;
      }
    });
  }

  // get an image from database if there is not image
  // in the experience, so can be setting in the modal
  getImage(){
    this.imageUploadService.get(5).subscribe(
      data => {
        this.image = data;
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
    this.modalSetting.push({label: 'Institución', input: true, value: data.institution});
    this.modalSetting.push({label: 'Titulo o puesto', input: true, value: data.degree});
    this.modalSetting.push({label: 'Fecha', input: true, value: data.date});
    this.modalSetting.push({label: 'Periodo', textarea: true, value: data.period});
    console.log(this.modalSetting)
  }

  // if confirm the change in the modal, set the educations
  // based in the change in modalSetting 
  setEducation(data: any): EducationDto {
    let educationDto = new EducationDto(
      this.modalSetting[2].value,
      this.modalSetting[3].value,
      this.modalSetting[4].value,
      this.modalSetting[5].value
    );
    return educationDto;
  }

  openUpdateModal(data: Education): void{
    this.setModalSetting(data);
    this.activeModal = 'active'
  }

  setNoData(value: boolean) {
    this.noData = value;
  }

  addDegree(value: string, id: number) {
    for (const obj of this.educations) {
      if (obj.id === id) {
        obj.degree = value;
        break;
      }
    }
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
    let experience: EducationDto = new EducationDto('Nueva institucion', 'Titulo', this.util.getToday(), 'Periodo');
    this.educationService.save(experience).subscribe(
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
    this.reload();
  }

  // reload the page
  reload(): void {window.location.reload();}

  onUpdate(): void {
    let experience = this.setEducation(this.modalSetting);
    this.educationService.update(experience, this.modalSetting[0].id).subscribe(
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
    setTimeout(() => {
      this.reload();
    }, 3000);
  }
  
  delete(id: number): void {
    this.educationService.delete(id).subscribe(
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
    this.reload();
  }

}
