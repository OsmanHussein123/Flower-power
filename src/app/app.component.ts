import { Component } from '@angular/core';
import {RestService} from "./services/rest.service";
import {Image} from "./models/image";
import {Subscription} from "rxjs";
import {ImagingService} from "./services/imaging.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'annotation-tool';
  image: Image;
  subscription: Subscription;
  imageToShow: any;
  isImageLoading: boolean;
  constructor(private rest: RestService, private imageservice: ImagingService) {
  }

  ngOnInit(): void {
    this.subscription = this.imageservice.currentMessage.subscribe(message => this.image = message);
  }



  createImageFromBlob(image: Blob): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.imageToShow = reader.result;
      this.newMessage(this.imageToShow);
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }

  }
  public getAnnotations(): void{
    this.isImageLoading = true;
    this.rest.send(this.image).subscribe((data) => {
      this.createImageFromBlob(data);
      this.isImageLoading = false;
    }, error => {
      this.isImageLoading = false;
      console.log(error);
    });
  }

  newMessage(mess: any): void {
    this.image.scr = mess;
    this.imageservice.changeMessage(this.image);
  }
}
