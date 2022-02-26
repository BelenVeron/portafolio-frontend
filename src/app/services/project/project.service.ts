import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from 'src/app/models/crud/project';
import { environment } from 'src/environments/environment';
import { TokenService } from '../auth/token.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  projectURL = environment.projectURL;

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService
    ) { }

  public get(): Observable<Project[]> {
    return this.httpClient.get<Project[]>(this.projectURL + 'get/' + this.tokenService.getUsername());
  }

  public save(project: Project): Observable<any> {
    return this.httpClient.post<any>(this.projectURL + 'create/' + this.tokenService.getUsername(), project);
  }

  public update(project: Project): Observable<any> {
    return this.httpClient.put<any>(this.projectURL + 'update', project);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.projectURL + `delete/${id}`);
  }
}
