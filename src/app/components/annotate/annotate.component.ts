import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {ImagingService} from '../../services/imaging.service';

@Component({
  selector: 'app-annotate',
  templateUrl: './annotate.component.html',
  styleUrls: ['./annotate.component.css']
})
export class AnnotateComponent implements OnInit {

  rectTop = 10;
  rectRight = 20;
  rectVisibility = '';

  message: string;
  subscription: Subscription;

  constructor(private data: ImagingService) { }

  ngOnInit() {
    this.subscription = this.data.currentMessage.subscribe(message => this.message = message)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onClick(event){
    const x  = event.pageX;
    const y = event.pageY;


    console.log(x+" " + y);
  }

}
