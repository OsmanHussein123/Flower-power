import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {ImagingService} from '../../services/imaging.service';
import {Annotation} from '../../models/annotation';
import {LabelingService} from '../../services/labeling.service';
import {Image} from "../../models/image";

@Component({
  selector: 'app-annotate',
  templateUrl: './annotate.component.html',
  styleUrls: ['./annotate.component.css']
})
export class AnnotateComponent implements OnInit {

  image: Image;
  label = '';
  subscription: Subscription;

  constructor(private data: ImagingService, private labeling: LabelingService) { }

  ngOnInit(): void {
    this.subscription = this.data.currentMessage.subscribe(message => this.image = message);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onClick(e): void{
    this.makeAnnotation(e);
  }

  makeAnnotation(event): void{
    const rect = event.target.getBoundingClientRect();

    let x = event.clientX;
    let y = event.clientY;

    if (x < (rect.left + 50)){
      x = rect.left + 50;
    }
    if (x > (rect.right - 50)){
      x = rect.right - 50;
    }
    if (y < (rect.top + 50)){
      y = rect.top + 50;
    }
    if (y > (rect.bottom - 50)){
      y = rect.bottom - 50;
    }

    const left = x - 50 + 'px';
    const top = y - 50 + 'px';
    const ann = new Annotation(top, left);
    // @ts-ignore
    if (this.labeling.label !== ''){
      ann.label = this.labeling.label;
    }
    console.log(ann);
    this.data.addAnnotation(ann);
  }

}
