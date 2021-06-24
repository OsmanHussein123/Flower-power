import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Image} from '../models/image';
import {Annotation} from '../models/annotation';

@Injectable({
  providedIn: 'root'
})
export class ImagingService {

  private messageSource = new BehaviorSubject(new Image('https://host.sonspring.com/domgallery/img/placeholder.gif', ''));
  currentMessage = this.messageSource.asObservable();
  public image: Image;

  constructor() { }

  changeMessage(message: any): void {
    this.image = message;
    console.log(message);
    this.messageSource.next(message);

  }

  addAnnotation(ann: Annotation): void {
    console.log(this.image);
    this.image.annotations.push(ann);
  }
}
