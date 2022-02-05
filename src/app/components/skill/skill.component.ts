import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Skill } from 'src/app/models/crud/skill';
import { SkillDto } from 'src/app/models/crud/skill-dto';
import { TokenService } from 'src/app/services/auth/token.service';
import { SkillService } from 'src/app/services/skill/skill.service';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {

  source: string = ''

  skills: Skill[] = [];
  isAdmin = false;
  maxlenght: string = '4';

  constructor(
    private SkillService: SkillService,
    private toastr: ToastrService,
    private tokenService: TokenService,
    ) {
      
    }


  ngOnInit(): void {
    this.getSkills();
    this.isAdmin = this.tokenService.isAdmin();
    if(this.isAdmin){
      this.maxlenght = '3'
    }else{
      this.maxlenght = '4'
    }
  }

  getSkills(): void {
    this.SkillService.get().subscribe(
      data => {
        this.skills = data;
      },
      err => {
        console.log(err);
      }
    )
  }

  addPercent(value: string, id: number) {
    /* value = value.replace(/[^0-9\.]+/g, '')
    if (isNaN(parseInt(value))){
      value = '0'
    } else {
       value = value.replace(/^0+(\d)/, '$1')
    } */
    console.log(value)
    let percent = parseInt(value, 10);
    for (const obj of this.skills) {
      if (obj.id === id) {
        obj.percent = percent;
        break;
      }
    }
  }

  addName(value: string, id: number) {
    for (const obj of this.skills) {
      if (obj.id === id) {
        obj.name = value;
        break;
      }
    }
  }

  
  onUpdate(skill: Skill): void {
    this.SkillService.update(skill).subscribe(
      data => {
        this.toastr.success('Skill update', 'OK', {
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

  delete(id: number) {
    this.SkillService.delete(id).subscribe(
      data => {
        this.toastr.success('Skill delete', 'OK', {
          timeOut: 3000
        });
        this.getSkills();
      },
      err => {
        this.toastr.error(err.error.message, 'Fail', {
          timeOut: 3000
        });
      }
    )
  }

  addSkill(): void {
    let skill: SkillDto = new SkillDto('Nombre', 0);
    this.SkillService.save(skill).subscribe(
      data => {
        this.toastr.success('Skill guardado', 'OK', {
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
    this.reload();
  }

  reload(): void {window.location.reload();}

}
