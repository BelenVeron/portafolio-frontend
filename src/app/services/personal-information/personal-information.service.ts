import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PersonalInformation } from 'src/app/models/crud/personal-information';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonalInformationService {

  personalInformationURL = environment.personalInformationURL;

  constructor(private httpClient: HttpClient) { }

  public get(): Observable<PersonalInformation> {
    return this.httpClient.get<PersonalInformation>(this.personalInformationURL + 'get/Fran');
  }

  public save(personalInformation: PersonalInformation): Observable<any> {
    return this.httpClient.post<any>(this.personalInformationURL + 'create', personalInformation);
  }

  public update(personalInformation: PersonalInformation): Observable<any> {
    return this.httpClient.put<any>(this.personalInformationURL + `update/`, personalInformation);
  }

  public delete(id:number, personalInformation: PersonalInformation): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: personalInformation,
    };
    return this.httpClient.delete<any>(this.personalInformationURL + `delete}`, options);
  }
}
