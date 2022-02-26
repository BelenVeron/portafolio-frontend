import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PersonalInformation } from 'src/app/models/crud/personal-information';
import { environment } from 'src/environments/environment';
import { TokenService } from '../auth/token.service';

@Injectable({
  providedIn: 'root'
})
export class PersonalInformationService {

  personalInformationURL = environment.personalInformationURL;

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService
    ) { }

  public get(): Observable<PersonalInformation> {
    return this.httpClient.get<PersonalInformation>(this.personalInformationURL + 'get/' + this.tokenService.getUsername());
  }

  public save(personalInformation: PersonalInformation): Observable<any> {
    return this.httpClient.post<any>(this.personalInformationURL + 'create/' + this.tokenService.getUsername(), personalInformation);
  }
  
  public create(personalInformation: PersonalInformation): Observable<any> {
    return this.httpClient.post<any>(this.personalInformationURL + 'create/' + this.tokenService.getUsername(), personalInformation);
  }

  public update(personalInformation: PersonalInformation): Observable<any> {
    return this.httpClient.put<any>(this.personalInformationURL + 'update/' + this.tokenService.getUsername(), personalInformation);
  }

  public delete(personalInformation: PersonalInformation): Observable<any> {
    return this.httpClient.delete<any>(this.personalInformationURL + `delete/${personalInformation.id}`);
  }
}
