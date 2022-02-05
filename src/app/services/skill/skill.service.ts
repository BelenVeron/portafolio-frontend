import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Skill } from 'src/app/models/crud/skill';
import { SkillDto } from 'src/app/models/crud/skill-dto';
import { environment } from 'src/environments/environment';
import { TokenService } from '../auth/token.service';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  skillUrl = environment.skillURL;

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService
    ) { }

  public get(): Observable<Skill[]> {
    return this.httpClient.get<Skill[]>(this.skillUrl + 'get/' + this.tokenService.getUsername());
  }

  public save(skill: SkillDto): Observable<any> {
    return this.httpClient.post<any>(this.skillUrl + 'create/' + this.tokenService.getUsername(), skill);
  }

  public update(skill: Skill): Observable<any> {
    return this.httpClient.put<any>(this.skillUrl + 'update/' + skill.id, skill);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.skillUrl + `delete/${id}`);
  }
}
