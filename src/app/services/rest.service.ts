import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ExtractData} from './extract-data';
import {map} from 'rxjs/operators';
import {Image} from '../models/image';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  private url = 'http://127.0.0.1:5000/upload';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'multipart/form-data'
    })
  };

  constructor(private http: HttpClient) { }

  send(image: Image): Observable<Blob> {
    const formData: any = new FormData();
    const ll = image.form.get('avatar').value;
    formData.append('files[]', ll);

    return this.http.post(this.url, formData, {responseType: 'blob'});
  }

}
