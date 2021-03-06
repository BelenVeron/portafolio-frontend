import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Experience } from 'src/app/models/crud/experience';
import { environment } from 'src/environments/environment';
import { TokenService } from '../auth/token.service';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  experienceURL = environment.experienceURL;

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService
    ) { }

  public get(): Observable<Experience[]> {
    return this.httpClient.get<Experience[]>(this.experienceURL + 'get/' + this.tokenService.getUsername());
  }

  public save(experience: Experience): Observable<any> {
    return this.httpClient.post<any>(this.experienceURL + 'create/' + this.tokenService.getUsername(), experience);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.experienceURL + `delete/${id}`);
  }
}
