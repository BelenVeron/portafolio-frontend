import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SocialMedia } from 'src/app/models/crud/social-media';
import { SocialMediaDto } from 'src/app/models/crud/social-media-dto';
import { environment } from 'src/environments/environment';
import { TokenService } from '../auth/token.service';

@Injectable({
  providedIn: 'root'
})
export class SocialMediaService {

  socialUrl = environment.socialURL;

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService
    ) { }

  public get(): Observable<SocialMedia[]> {
    return this.httpClient.get<SocialMedia[]>(this.socialUrl + 'get/' + this.tokenService.getUsername());
  }

  public save(social: SocialMediaDto): Observable<any> {
    return this.httpClient.post<any>(this.socialUrl + 'create/' + this.tokenService.getUsername(), social);
  }

  public update(social: SocialMedia): Observable<any> {
    return this.httpClient.put<any>(this.socialUrl + 'update', social);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.socialUrl + `delete/${id}`);
  }
}
