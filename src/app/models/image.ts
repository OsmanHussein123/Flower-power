import {Annotation} from './annotation';
import {FormBuilder, FormGroup} from "@angular/forms";

export class Image {

  public id: number;
  public scr: string;
  form: FormGroup;
  public annotations: Annotation[];

  constructor(scr, form) {
    this.id = 0;
    this.scr = scr;
    this.annotations = [];

    this.form = form;
  }

}
