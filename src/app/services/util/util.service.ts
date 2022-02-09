import { Injectable } from '@angular/core';
import { DatePipe, formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private datePipe: DatePipe) { }

  public getToday(): string {
    return this.datePipe.transform(new Date(Date.now()), 'dd-MM-yyyy') || ''
  }
}
