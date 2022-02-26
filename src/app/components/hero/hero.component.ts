import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Hero } from 'src/app/models/crud/hero';
import { Image } from 'src/app/models/crud/image';
import { TokenService } from 'src/app/services/auth/token.service';
import { HeroService } from 'src/app/services/hero/hero.service';
import { ImageUploadService } from 'src/app/services/image-upload/image-upload.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  @Input() heroUrl: string = 'hero.png'
  @Input() animation: string = 'overlay';
  activeAnimation: boolean = true;
  interval?: number = 0;

  @ViewChild('imageInputFile', {static: false}) imageFile!: ElementRef;
  image!:  File;
  imageMin!:  File;
  
  source: string = ''

  hero!: Hero | null;
  imageDB!: Image;
  // if is admin
  isAdmin = false;
  // if no data
  noData = false;
  // stop and play animation
  @Input() stopAnimation: boolean =  false;
  // if do not want to show edit buttons
  @Input() noButton = false;
  @Input() activeModal: string = '';
  modalSetting: any[] = []

  constructor(
    private heroService: HeroService,
    private toastr: ToastrService,
    private tokenService: TokenService,
    private spinner: NgxSpinnerService,
    private imageUploadService: ImageUploadService,
  ) { }

  ngOnInit(): void {
    if (!this.stopAnimation){
      this.setAnimation();
      setInterval(()=>{this.setAnimation()}, 5000);
    }
    this.isAdmin = this.tokenService.isAdmin();
  }

  ngAfterViewInit(): void {
    this.getHero();
  }

  setAnimation(): void {
    if(this.activeAnimation) {
      this.animation = 'overlay';
      this.activeAnimation = false;
    }else {
      this.animation = '';
      this.activeAnimation = true;
    }
  }

  async uploadImage(): Promise<void> {
    this.imageUploadService.uploadRemoteUrl(this.source).subscribe(
      data => {
        this.toastr.success('hero update', 'OK', {
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

  // set modalSetting with hero, to send to modal
  // and make the element that is need
  setModalSetting(): void {
    if (this.hero != null) {
      this.modalSetting = [];
      this.modalSetting.push({image: true, type: 'square', value: this.hero.image});
    }else{
      this.modalSetting.push({image: true, type: 'square', value: null});
    }
  }

  // if confirm the change in the modal, set the hero
  // based in the change in modalSetting 
  setHero(): void {
    if (this.modalSetting[0].value != null) {
      if (this.hero != null) {
        this.hero.image = this.modalSetting[0].value;
      }else{
        this.hero = new Hero (null, this.modalSetting[0].value);
      }
    }
  }

  openUpdateModal(): void{
    this.activeModal = 'active'
  }

  // get image url in the database
  getImageDB(id: any): void{
    this.imageUploadService.get(id).subscribe(
      data => {
        this.imageDB = data;
      },
      err => {
        console.log(err);
        if (err.status === 400){
          this.setNoData(true);
        }
      }
    );
  }

  getHero(): void {
    this.spinner.show()
    this.heroService.get().subscribe(
      data => {
        this.hero = data;
        this.setSource(this.hero);
        if (this.hero !== null && this.hero.image) {
          this.getImageDB(this.hero.image.id);
        }
        this.setModalSetting();
        this.spinner.hide()
      },
      err => {
        if (err.status === 400){
          this.setNoData(true);
          this.setSource(null);
          this.spinner.hide()
        }
      }
    )
  }

  // When there is no information
  setNoData(value: boolean): void{
    this.noData = value;
  }

  
  setSource(data: any){
    if (data ===  null || data.image == null) {
      this.source = 'https://res.cloudinary.com/angular-portafolio/image/upload/v1643579687/default/hero_qsmo76.png'
    } else {
      this.source = data.image.imageUrl;
    }
  }
  
  

  onUpdate(): void {
    this.setHero();
    if (this.hero != null) {
      this.heroService.save(this.hero).subscribe(
        data => {
          // set source to the image
          this.setSource(this.hero);
          this.toastr.success('hero update', 'OK', {
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
    // close the modal, and set the active property
    this.activeModal = ''
  }

  cancel(): void {
    this.activeModal = ''
  }

}
