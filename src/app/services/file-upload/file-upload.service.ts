import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  // API url
  baseApiUrl = "https://res.cloudinary.com/angular-portafolio/image/upload/v1643442711/"

  constructor(private http: HttpClient) { }

}
