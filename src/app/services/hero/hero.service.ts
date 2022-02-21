import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hero } from 'src/app/models/crud/hero';
import { environment } from 'src/environments/environment';
import { TokenService } from '../auth/token.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  heroURL = environment.heroURL;

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService
    ) { }

  public get(): Observable<Hero> {
    return this.httpClient.get<Hero>(this.heroURL + 'get/' + this.tokenService.getUsername());
  }

  public save(personalInformation: Hero): Observable<any> {
    return this.httpClient.post<any>(this.heroURL + 'create/' + this.tokenService.getUsername(), personalInformation);
  }
  
  public create(personalInformation: Hero): Observable<any> {
    return this.httpClient.post<any>(this.heroURL + 'create/' + this.tokenService.getUsername(), personalInformation);
  }

  public update(personalInformation: Hero): Observable<any> {
    return this.httpClient.put<any>(this.heroURL + 'update/' + this.tokenService.getUsername(), personalInformation);
  }
}
