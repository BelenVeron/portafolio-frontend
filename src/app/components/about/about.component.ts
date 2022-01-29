import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, map, Observable } from 'rxjs';
import { PersonalInformation } from 'src/app/models/crud/personal-information';
import { TokenService } from 'src/app/services/auth/token.service';
import { PersonalInformationService } from 'src/app/services/personal-information/personal-information.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  source: string = ''

  personalInformation!: PersonalInformation;
  isAdmin = false;

  constructor(
    private personalInformationService: PersonalInformationService,
    private toastr: ToastrService,
    private tokenService: TokenService
    ) { }

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
    //this.source = `/assets/images/${data.picture}.png`;
    this.source = `/assets/images/profile.png`;
    console.log(this.source)
  }
  
  onUpdate(): void {
    console.log(this.personalInformation)
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
