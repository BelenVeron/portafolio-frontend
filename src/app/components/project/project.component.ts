import { Component, Input, OnInit } from '@angular/core';
import { Project } from 'src/app/models/crud/project';
import { Image } from 'src/app/models/crud/image';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from 'src/app/services/auth/token.service';
import { ProjectService } from 'src/app/services/project/project.service';
import { ImageUploadService } from 'src/app/services/image-upload/image-upload.service';
import { UtilService } from 'src/app/services/util/util.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  title: string = 'Proyectos';
  isAdmin: boolean = false;
  projects: Project[] = [];
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
    private projectService: ProjectService,
    private imageUploadService: ImageUploadService,
    private util: UtilService
    ) {
      
    }

  ngOnInit(): void {
    this.isAdmin = this.tokenService.isAdmin();
    this.getCards();
  }

  // get all the work projects in the database and
  // assign to this.projects
  getCards(): void {
    this.projectService.get().subscribe(
      data => {
        this.projects = data;
        if (this.projects.length === 0) {
          this.noData = true
        }
      },
      err => {
        if (err.status === 400){
          
        }
      }
    )
  }

  // set modalSetting with Project, to send to modal
  // and make the element that is need
  setModalSetting(data: Project): void {
    if (!data.image){
      this.source = 'https://res.cloudinary.com/angular-portafolio/image/upload/v1643579687/default/hero_qsmo76.png'
    }else{
      this.source = data.image.imageUrl
    }
    this.modalSetting.push({id: data.id});
    this.modalSetting.push({label: 'Imagen', image: true, type: 'square', value: data.image});
    this.modalSetting.push({label: 'Nombre', input: true, value: data.name});
    this.modalSetting.push({label: 'Descripcion', input: true, value: data.description});
    this.modalSetting.push({label: 'Fecha', input: true, value: data.date});
    this.modalSetting.push({label: 'Link', textarea: true, value: data.link});
    console.log(this.modalSetting)
  }

  // if confirm the change in the modal, set the projects
  // based in the change in modalSetting 
  setProject(): Project {
    let project = new Project(
      this.modalSetting[0].id,
      this.modalSetting[2].value,
      this.modalSetting[3].value,
      this.modalSetting[4].value,
      this.modalSetting[5].value,
      this.modalSetting[1].value
    );
    this.projects.forEach(element => {
      if (element.id === project.id) {
        element.name = project.name;
        element.date = project.date;
        element.description = project.description;
        element.date = project.date;
        element.image = project.image;
      }
    });
    this.modalSetting = [];
    return project;
  }

  openUpdateModal(data: Project): void{
    this.setModalSetting(data);
    this.activeModal = 'active'
  }

  cancel(): void {
    this.activeModal = ''
  }

  setNoData(value: boolean) {
    this.noData = value;
  }

  // set the source in the image of every component in html
  setSourceImage(data: Project): string{
    if (data.image == null) {
      return 'https://res.cloudinary.com/angular-portafolio/image/upload/v1643579687/default/hero_qsmo76.png'
    } else {
      return data.image.imageUrl;
    }
  }

  async uploadImage(): Promise<void> {
    this.imageUploadService.uploadRemoteUrl(this.source).subscribe(
      data => {
        this.toastr.success('Project update', 'OK', {
          timeOut: 3000
        });
        this.imageDB;
      },
      err => {
        console.log('error',err);
        this.toastr.error(err.error.message, 'Fail', {
          timeOut: 3000
        }); 
      }
    );
  }

  addCard(): void {
    let project: Project = new Project(
      null,
      'Nombre', 
      'Descripcion', 
      this.util.getToday(), 
      'Link',
      null
    );

    this.projectService.save(project).subscribe(
      data => {
        this.toastr.success('Project guardado', 'OK', {
          timeOut: 3000
        });
        this.projects.push(data);
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
    this.projectService.save(this.setProject()).subscribe(
      data => {
        this.toastr.success('Project guardado', 'OK', {
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
      this.projectService.delete(id).subscribe(
        data => {
          this.toastr.success('Proyecto eliminado', 'OK', {
            timeOut: 3000
          });
          this.projects = this.projects.filter(el => el.id !== id);
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

  goProject(data: string) {
    window.open(data, "_blank");
  }

}
