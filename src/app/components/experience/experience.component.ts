import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Experience } from 'src/app/models/crud/experience';
import { TokenService } from 'src/app/services/auth/token.service';
import { ExperienceService } from 'src/app/services/experience/experience.service';
import { ImageUploadService } from 'src/app/services/image-upload/image-upload.service';
import { Image } from 'src/app/models/crud/image';
import { ExperienceDto } from 'src/app/models/crud/experience-dto';
import { UtilService } from 'src/app/services/util/util.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {
  
  title: string = 'EXPERIENCIA LABORAL';
  isAdmin: boolean = false;
  experiences: Experience[] = [];
  source: string = '';
  noData: boolean = false;
  today: Date = new Date(Date.now());
  @Input() activeModal: string = '';
  modalSetting: any[] = []
  image!: Image;

  constructor(
    private toastr: ToastrService,
    private tokenService: TokenService,
    private experienceService: ExperienceService,
    private imageUploadService: ImageUploadService,
    private util: UtilService
    ) {
      
    }
  ngOnInit(): void {
    this.isAdmin = this.tokenService.isAdmin();
    this.getCards();
  }

  // get all the work experiences in the database and
  // assign to this.experiences
  getCards(): void {
    this.experienceService.get().subscribe(
      data => {
        this.experiences = data;
        if (this.experiences.length === 0) {
          this.noData = true
        }
        this.setSources(this.experiences);
      },
      err => {
        if (err.status === 400){
          
        }
      }
    )
  }

  setSources(data: Experience[]) {
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

  // set modalSetting with Experience, to send to modal
  // and make the element that is need
  setModalSetting(data: Experience): void {
    if (!data.image){
      this.source = 'https://res.cloudinary.com/angular-portafolio/image/upload/v1643579687/default/hero_qsmo76.png'
    }else{
      this.source = data.image.imageUrl
    }
    this.modalSetting.push({id: data.id});
    this.modalSetting.push({label: 'Imagen', image: true, type: 'square', value: data.image});
    this.modalSetting.push({label: 'Titulo o puesto', input: true, value: data.degree});
    this.modalSetting.push({label: 'Fecha inicio', input: true, value: data.start});
    this.modalSetting.push({label: 'Fecha finalizacion', input: true, value: data.end});
    this.modalSetting.push({label: 'Descripcion', textarea: true, value: data.description});
    console.log(this.modalSetting)
  }

  // if confirm the change in the modal, set the experiences
  // based in the change in modalSetting 
  setExperience(data: any): ExperienceDto {
    let experienceDto = new ExperienceDto(
      this.modalSetting[2].value,
      this.modalSetting[3].value,
      this.modalSetting[4].value,
      false,
      this.modalSetting[5].value
    );
    return experienceDto;
  }

  openUpdateModal(data: Experience): void{
    this.setModalSetting(data);
    this.activeModal = 'active'
  }

  setNoData(value: boolean) {
    this.noData = value;
  }

  addDegree(value: string, id: number) {
    for (const obj of this.experiences) {
      if (obj.id === id) {
        obj.degree = value;
        break;
      }
    }
  }

  // set the source in the image of every component in html
  setSourceImage(data: Experience): string{
    if (data.image == null) {
      return 'https://res.cloudinary.com/angular-portafolio/image/upload/v1643579687/default/hero_qsmo76.png'
    } else {
      return data.image.imageUrl;
    }
  }

 

  addCard(): void {
    let experience: ExperienceDto = new ExperienceDto('Nuevo Puesto o lugar', this.util.getToday(), this.util.getToday(), false, 'Descripcion');
    this.experienceService.save(experience).subscribe(
      data => {
        this.toastr.success('Experience guardado', 'OK', {
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

  reload(): void {window.location.reload();}

  onUpdate(): void {
    let experience = this.setExperience(this.modalSetting);
    this.experienceService.update(experience, this.modalSetting[0].id).subscribe(
      data => {
        this.toastr.success('Experience guardado', 'OK', {
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
  
  delete(id: number): void {
    this.experienceService.delete(id).subscribe(
      data => {
        this.toastr.success('Experience guardado', 'OK', {
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
