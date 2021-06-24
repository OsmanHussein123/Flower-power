import { Component, OnInit } from '@angular/core';
import {LabelingService} from '../../services/labeling.service';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.css']
})
export class LabelComponent implements OnInit {


  labels: [] = this.lab.labels;

  constructor(private lab: LabelingService) { }

  ngOnInit(): void {
  }

  onSelect(label): void{
    this.lab.label = label;
  }

}
