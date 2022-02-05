import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Image } from '../../models/crud/image';
import { TokenService } from '../auth/token.service';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  imageURL = 'http://localhost:8080/';

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService
    ) { }

  public list(): Observable<Image[]> {
    return this.httpClient.get<Image[]>(this.imageURL + 'list');
  }

  public upload(image: File, service: string): Observable<any> {
    const formData = new FormData();
    formData.append('multipartFile', image);
    return this.httpClient.put<any>(this.imageURL + service + '/update-image/' + this.tokenService.getUsername(), formData);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.imageURL + `delete/${id}`);
  }
}
