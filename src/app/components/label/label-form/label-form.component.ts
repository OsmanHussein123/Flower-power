import { Component, OnInit } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {LabelingService} from '../../../services/labeling.service';


@Component({
  selector: 'app-label-form',
  templateUrl: './label-form.component.html',
  styleUrls: ['./label-form.component.css']
})
export class LabelFormComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  labels: [] = this.lab.labels;
  constructor(private lab: LabelingService) { }

  ngOnInit(): void {
  }

  add(event: MatChipInputEvent): void {
    const value: string = (event.value || '').trim();

    // Add our label
    if (value) {
      this.lab.addLabel(value);
    }

    // Clear the input value
    // tslint:disable-next-line:no-non-null-assertion
    event.input.value = '';
  }

  remove(value: string): void {
    // @ts-ignore
    const index = this.labels.indexOf(value);

    if (index >= 0) {
      this.lab.deleteLabel(index);
    }
  }
}
