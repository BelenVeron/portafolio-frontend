import { Component, OnInit } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from "@angular/core";
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
    this.getCard();
  }

  getCard(): void {
    this.experienceService.get().subscribe(
      data => {
        this.experiences = data;
        if (this.experiences.length === 0) {
          this.noData = true
        }
        this.setSource(this.experiences);
      },
      err => {
        if (err.status === 400){
          this.setNoData(true);
        }
      }
    )
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

  setSource(data: Experience[]){
    data.forEach(element => {
      if (element.image == null) {
        let imageUrl = 'https://res.cloudinary.com/angular-portafolio/image/upload/v1643579684/default/profile.png'
        element.image = new Image(0, 'image', imageUrl, '0');
      }
    });
  }

 

  addCard(): void {
    let experience: ExperienceDto = new ExperienceDto('Puesto o lugar', this.util.getToday(), this.util.getToday(), 'Descripcion');
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
    console.log('update card')
  }

  delete(): void {
    console.log('delete card')
  }

}
