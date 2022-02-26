import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Skill } from 'src/app/models/crud/skill';
import { TokenService } from 'src/app/services/auth/token.service';
import { SkillService } from 'src/app/services/skill/skill.service';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {

  skills: Skill[] = [];
  isAdmin = false;
  title: string = 'HARD & SOFT SKILLS'

  @Input() activeModal: string = '';
  modalSetting: any[] = []
  // if no data
  noData: boolean = false;
  // if do not want to show edit buttons
  @Input() noButton = false;

  constructor(
    private SkillService: SkillService,
    private toastr: ToastrService,
    private tokenService: TokenService,
    ) {
      
    }


  ngOnInit(): void {
    this.getSkills();
    this.isAdmin = this.tokenService.isAdmin();
  }

  cancel(): void {
    this.activeModal = ''
  }

  getSkills(): void {
    this.SkillService.get().subscribe(
      data => {
        this.skills = data;
        if (data.length === 0) {
          this.noData = true
        }
      },
      err => {
        console.log(err);
      }
    )
  }

    // set modalSetting with Experience, to send to modal
  // and make the element that is need
  setModalSetting(data: Skill): void {
    this.modalSetting.push({id: data.id});
    this.modalSetting.push({label: 'Nombre', input: true, type: 'text', value: data.name});
    this.modalSetting.push({label: 'Porcentaje', input: true, type: 'number', value: data.percent});
    console.log(this.modalSetting)
  }

  // if confirm the change in the modal, set the experiences
  // based in the change in modalSetting 
  setSkill(): Skill {
    let percent: number = Number(this.modalSetting[2].value)
    let skill = new Skill(
      this.modalSetting[0].id,
      this.modalSetting[1].value,
      percent,
    );
    this.skills.forEach(element => {
      if (element.id === skill.id) {
        element.name = skill.name;
        element.percent = skill.percent;
      }
    });
    this.modalSetting = [];
    return skill;
  }

  openUpdateModal(data: Skill): void{
    this.setModalSetting(data);
    this.activeModal = 'active'
  }

  setNoData(value: boolean) {
    this.noData = value;
  }


  addName(value: string, id: number) {
    for (const obj of this.skills) {
      if (obj.id === id) {
        obj.name = value;
        break;
      }
    }
  }

  
  onUpdate(): void {
    this.SkillService.update(this.setSkill()).subscribe(
      data => {
        this.toastr.success('Skill actualizado', 'OK', {
          timeOut: 3000
        });
        console.log(data)
      },
      err => {
        console.log('error',err);
        this.toastr.error(err.error.message, 'Fail', {
          timeOut: 3000
        });
      }
    )
  }

  delete(id: number | null) {
    if (id != null){
      this.SkillService.delete(id).subscribe(
        data => {
          this.toastr.success('Skill eliminado', 'OK', {
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
  }

  addSkill(): void {
    let skill: Skill = new Skill(null, 'Nombre', 0);
    this.SkillService.save(skill).subscribe(
      data => {
        this.toastr.success('Skill agregado', 'OK', {
          timeOut: 3000
        });
        this.skills.push(data)
        this.noData = false
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
