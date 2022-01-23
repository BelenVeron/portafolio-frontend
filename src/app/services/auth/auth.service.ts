import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtDto } from 'src/app/models/auth/jwt-dto';
import { UserLogin } from 'src/app/models/auth/user-login';
import { UserRegister } from 'src/app/models/auth/user-register';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL = environment.authURL;

  constructor(private httpClient: HttpClient) { }

  public register(userRegister: UserRegister): Observable<any> {
    return this.httpClient.post<any>(this.authURL + 'new', userRegister);
  }

  public login(userLogin: UserLogin): Observable<JwtDto> {
    return this.httpClient.post<JwtDto>(this.authURL + 'login', userLogin);
  }

  public refresh(dto: JwtDto): Observable<JwtDto> {
    return this.httpClient.post<JwtDto>(this.authURL + 'refresh', dto);
  }
}
