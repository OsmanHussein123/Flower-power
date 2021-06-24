import { Component, OnInit } from '@angular/core';
import {ImagingService} from '../../services/imaging.service';
import {Subscription} from 'rxjs';
import {Image} from '../../models/image';
import {Annotation} from '../../models/annotation';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})
export class ImageListComponent implements OnInit {

  image: Image;
  subscription: Subscription;
  images: Array<Image> = [];
  urls = new Array<string>();

  form: FormGroup;

  constructor(private imageservice: ImagingService, public fb: FormBuilder) {
    this.form = this.fb.group({
      avatar: [null]
    });
  }

  ngOnInit(): void {
    this.subscription = this.imageservice.currentMessage.subscribe(message => this.image = message)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }



  detectFiles(event): void {
    this.images = [];
    this.urls = [];
    const files = event.target.files;
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({
      avatar: file
    });
    this.form.get('avatar').updateValueAndValidity()
    if (files) {
      for (const filee of files) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const im = new Image(e.target.result, this.form);
          this.images.push(im);
          this.urls.push(e.target.result);
        };
        reader.readAsDataURL(filee);
      }
    }


  }

  newMessage(mess: any): void {
    this.imageservice.changeMessage(mess);
  }
}
