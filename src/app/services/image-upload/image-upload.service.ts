import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Image } from '../../models/crud/image';
import { TokenService } from '../auth/token.service';
import { ImageDto } from 'src/app/models/crud/image-dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  imageURL = environment.imageURL;

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService
    ) { }

  public list(): Observable<Image[]> {
    return this.httpClient.get<Image[]>(this.imageURL + 'list');
  }

  public get(id: any): Observable<Image> {
    return this.httpClient.get<Image>(this.imageURL + 'get/' + id);
  }

  // save the image in cloudinary and the backend return the
  // image database with the new id and the other items 
  public upload(image: File): Observable<Image> {
    const formData = new FormData();
    formData.append('multipartFile', image);
    return this.httpClient.post<Image>(this.imageURL + 'upload', formData);
  }

  // save the image in cloudinary and the backend return the
  // image without id
  public uploadHost(image: File): Observable<Image> {
    const formData = new FormData();
    formData.append('multipartFile', image);
    return this.httpClient.post<ImageDto>(this.imageURL + 'upload-host', formData);
  }

  // save the image in cloudinary from url and the backend return the
  // image database
  public uploadRemoteUrl(url: string): Observable<Image> {
    return this.httpClient.post<Image>(this.imageURL + 'upload-url', {'url': url});
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.imageURL + `delete/${id}`);
  }
}
