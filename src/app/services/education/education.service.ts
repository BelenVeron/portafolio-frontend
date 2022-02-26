import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Education } from 'src/app/models/crud/education';
import { environment } from 'src/environments/environment';
import { TokenService } from '../auth/token.service';

@Injectable({
  providedIn: 'root'
})
export class EducationService {

  educationURL = environment.educationURL;

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService
    ) { }

  public get(): Observable<Education[]> {
    return this.httpClient.get<Education[]>(this.educationURL + 'get/' + this.tokenService.getUsername());
  }

  public save(education: Education): Observable<any> {
    return this.httpClient.post<any>(this.educationURL + 'create/' + this.tokenService.getUsername(), education);
  }

  public update(education: Education): Observable<any> {
    return this.httpClient.put<any>(this.educationURL + 'update', education);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.educationURL + `delete/${id}`);
  }
}
