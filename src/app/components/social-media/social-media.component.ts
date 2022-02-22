import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SocialMedia } from 'src/app/models/crud/social-media';
import { SocialMediaDto } from 'src/app/models/crud/social-media-dto';
import { TokenService } from 'src/app/services/auth/token.service';
import { SocialMediaService } from 'src/app/services/social-media/social-media.service';

@Component({
  selector: 'app-social-media',
  templateUrl: './social-media.component.html',
  styleUrls: ['./social-media.component.css']
})
export class SocialMediaComponent implements OnInit {

  socials: SocialMedia[] = [];
  isAdmin = false;
  title: string = 'SOCIAL MEDIA'

  @Input() size: number = 1;
  @Input() activeModal: string = '';
  modalSetting: SocialMedia[] = [];
  // if no data
  noData: boolean = false;
  // if do not want to show edit buttons
  @Input() noButton = false;
  // type of icon
  icon: string = 'close';

  constructor(
    private SocialMediaService: SocialMediaService,
    private toastr: ToastrService,
    private tokenService: TokenService,
    ) {
      
    }

  ngOnInit(): void {
    this.getSocialMedias();
    this.isAdmin = this.tokenService.isAdmin();
  }

  cancel(): void {
    this.activeModal = ''
  }

 

  // get the value of the settings and the event's value
  // of the input and set in the settings' value
  addLink(event: any, id: number): void {
    this.modalSetting.forEach(element => {
      if (element.id === id){
        element.link = event
        this.socials.forEach(element => {
          if (element.id === id){
            element.link = event
          }
        });
      }
    });
  }

  getSocialMedias(): void {
    this.SocialMediaService.get().subscribe(
      data => {
        this.socials = data;
      },
      err => {
        console.log(err);
      }
    )
  }

  // set modalSetting with Experience, to send to modal
  // and make the element that is need
  setModalSetting(): void {
    this.modalSetting = [
      {social: 'facebook', link: 'www.facebook.com', id: -5},
      {social: 'instagram', link: 'www.instagram.com', id: -4},
      {social: 'twitter', link: 'www.twitter.com', id: -3},
      {social: 'youtube', link: 'www.youtube.com', id: -2},
      {social: 'linkedin', link: 'www.linkedin.com', id: -1},
    ]
    for (let index = 0; index < this.modalSetting.length; index++) {
      if (this.socials.some(e => e.social === this.modalSetting[index].social)){
        let social = this.socials.find(e => e.social === this.modalSetting[index].social);
        if (social != undefined){
          this.modalSetting[index] = social;
        }
      }
    }
  }

  // if confirm the change in the modal, set the experiences
  // based in the change in modalSetting 
  setSocialMedia(): SocialMedia {
    let social = new SocialMedia(
      this.modalSetting[0].id,
      this.modalSetting[1].social,
      this.modalSetting[2].link,
    );
    return social;
  }

  openUpdateModal(): void{
    this.setModalSetting();
    this.activeModal = 'active';
  }

  setNoData(value: boolean) {
    this.noData = value;
  }

  addOrDelete(data: SocialMedia){
    if (data.id < 0){
      let social: SocialMediaDto = new SocialMediaDto(data.social, data.link);
      this.addSocialMedia(social);
    }else{
      this.delete(data.id);
    }
  }
  
  onUpdate(socialDto: SocialMedia): void {
    this.SocialMediaService.update(socialDto).subscribe(
      data => {
        this.toastr.success('SocialMedia update', 'OK', {
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

  delete(id: number) {
    this.SocialMediaService.delete(id).subscribe(
      data => {
        this.toastr.success('SocialMedia delete', 'OK', {
          timeOut: 3000
        });
        this.socials = this.socials.filter(el => el.id !== id);
        this.setModalSetting();
      },
      err => {
        this.toastr.error(err.error.message, 'Fail', {
          timeOut: 3000
        });
      }
    )
    this.cancel();
    this.openUpdateModal();
  }

  addSocialMedia(data: any): void {
    this.SocialMediaService.save(data).subscribe(
      data => {
        this.toastr.success('SocialMedia guardado', 'OK', {
          timeOut: 3000
        });
        this.socials.push(data);
        this.setModalSetting();
      },
      err => {
        console.log('error',err);
        this.toastr.error(err.error.message, 'Fail', {
          timeOut: 3000
        });
      }
    )
    this.cancel();
    this.openUpdateModal();
  }

  reload(): void {window.location.reload();}


}
